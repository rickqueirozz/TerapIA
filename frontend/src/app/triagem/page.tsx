"use client";
import React, { useMemo, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { usePersistentState } from "@/lib/usePersistentState";
import { sendTriage, startSession } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { FEELING_OPTIONS, REASONS_OPTIONS, FREQ_OPTIONS, TriageAnswers } from "@/types/triage";
import TriageButton from "@/components/TriageButton";
import OptionPill from "@/components/OptionPill";

const TOTAL_STEPS = 8;

export default function TriagePage() {
  const router = useRouter();
  const { t } = useI18n();
  const [answers, setAnswers] = usePersistentState<TriageAnswers>(
    "triageAnswers",
    {
      feelingToday: "",
      hadTherapyBefore: false,
      reasons: [],
      takingMeds: false,
      selfHarmThoughts: false,
      overwhelmFrequency: "Às vezes",
      hasSomeoneToTalk: false,
      age: undefined,
    }
  );
  const [step, setStep] = usePersistentState<number>("triageStep", 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => step / TOTAL_STEPS, [step]);

  function canGoNext(currentStep: number): boolean {
    if (currentStep === 1) {
      if (!answers.feelingToday) return false;
      if (answers.feelingToday === "Outro" && !answers.feelingOtherText?.trim()) return false;
    }
    if (currentStep === 6) {
      if (!answers.overwhelmFrequency) return false;
    }
    return true;
  }

  function next() {
    if (!canGoNext(step)) return;
    setStep(Math.min(TOTAL_STEPS, step + 1));
  }
  function back() { setStep(Math.max(1, step - 1)); }
  function goNextNow() { setStep(s => Math.min(TOTAL_STEPS, s + 1)); }

  async function finish() {
    setError(null);
    const age = answers.age;
    const isValidAge = typeof age === 'number' && Number.isInteger(age) && age >= 1 && age <= 120;
    if (!isValidAge) {
      setError('Informe uma idade válida (1-120).');
      return;
    }
    setLoading(true);
    try {
      let sessionId = localStorage.getItem('sessionId') || '';
      if (!sessionId) {
        const s = await startSession();
        sessionId = s.sessionId;
        localStorage.setItem('sessionId', sessionId);
      }
      const payload = { ...answers, age: answers.age as number };
      await sendTriage(sessionId, payload);
      router.push('/chat');
    } catch {
      setError('Falha ao salvar triagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t('start_triage')}</h1>
        <ProgressBar value={progress} />
        {error && <div className="mt-2 text-sm" style={{ color: '#a61b1b' }}>{error}</div>}
      </div>

      {step === 1 && (
        <QuestionCard title={t('feeling_today')}> 
          <div className="flex flex-wrap gap-2">
            {FEELING_OPTIONS.map(opt => (
              <OptionPill
                key={opt}
                active={answers.feelingToday === opt}
                onClick={() => {
                  setAnswers({ ...answers, feelingToday: opt });
                  if (opt !== 'Outro') {
                    goNextNow();
                  } else if ((answers.feelingOtherText || '').trim()) {
                    goNextNow();
                  }
                }}
              >
                {opt}
              </OptionPill>
            ))}
          </div>
          {answers.feelingToday === 'Outro' && (
            <input
              value={answers.feelingOtherText || ''}
              onChange={e => setAnswers({ ...answers, feelingOtherText: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter' && (answers.feelingOtherText || '').trim()) goNextNow(); }}
              placeholder={t('feeling_other_placeholder')}
              className="mt-3 w-full px-3 py-2 rounded border bg-transparent"
              style={{ borderColor: 'var(--border-color)', color: 'var(--foreground)' }}
            />
          )}
          <div className="flex justify-between mt-6">
            <div />
            <TriageButton disabled={!canGoNext(1)} onClick={next}>{t('next')}</TriageButton>
          </div>
        </QuestionCard>
      )}

      {step === 2 && (
        <QuestionCard title={t('had_therapy_before')}>
          <div className="flex gap-3">
            <OptionPill active={answers.hadTherapyBefore} onClick={() => setAnswers({ ...answers, hadTherapyBefore: true })}>{t('yes')}</OptionPill>
            <OptionPill active={!answers.hadTherapyBefore} onClick={() => { setAnswers({ ...answers, hadTherapyBefore: false, therapyDuration: undefined }); goNextNow(); }}>{t('no')}</OptionPill>
          </div>
          {answers.hadTherapyBefore && (
            <input
              value={answers.therapyDuration || ''}
              onChange={e => setAnswers({ ...answers, therapyDuration: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter' && (answers.therapyDuration || '').trim()) goNextNow(); }}
              placeholder={t('therapy_duration_placeholder')}
              className="mt-3 w-full px-3 py-2 rounded border bg-transparent"
              style={{ borderColor: 'var(--border-color)', color: 'var(--foreground)' }}
            />
          )}
          <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-color)' }}>{t('back')}</button>
            <TriageButton onClick={next}>{t('next')}</TriageButton>
          </div>
        </QuestionCard>
      )}

      {step === 3 && (
        <QuestionCard title={t('reasons')}>
          <div className="flex flex-wrap gap-2">
            {REASONS_OPTIONS.map(r => (
              <OptionPill
                key={r}
                active={answers.reasons.includes(r)}
                onClick={() => {
                  const already = answers.reasons.includes(r);
                  const newReasons = already ? answers.reasons.filter(x => x !== r) : [...answers.reasons, r];
                  setAnswers({ ...answers, reasons: newReasons });

                  if (!already) {
                    if (r !== 'Outro' && newReasons.some(x => x !== 'Outro')) setTimeout(() => goNextNow(), 200);
                    if (r === 'Outro' && (answers.reasonsOtherText || '').trim()) setTimeout(() => goNextNow(), 200);
                  }
                }}
              >
                {r}
              </OptionPill>
            ))}
          </div>
          {answers.reasons.includes('Outro') && (
            <input
              value={answers.reasonsOtherText || ''}
              onChange={e => setAnswers({ ...answers, reasonsOtherText: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter' && (answers.reasonsOtherText || '').trim()) goNextNow(); }}
              placeholder={t('reasons_other_placeholder')}
              className="mt-3 w-full px-3 py-2 rounded border bg-transparent"
              style={{ borderColor: 'var(--border-color)', color: 'var(--foreground)' }}
            />
          )}
          <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-color)' }}>{t('back')}</button>
            <TriageButton onClick={next}>{t('next')}</TriageButton>
          </div>
        </QuestionCard>
      )}

      {step === 4 && (
        <QuestionCard title={t('taking_meds')}>
          <div className="flex gap-3">
            <OptionPill active={answers.takingMeds} onClick={() => setAnswers({ ...answers, takingMeds: true })}>{t('yes')}</OptionPill>
            <OptionPill active={!answers.takingMeds} onClick={() => { setAnswers({ ...answers, takingMeds: false, medsWhich: undefined }); goNextNow(); }}>{t('no')}</OptionPill>
          </div>
          {answers.takingMeds && (
            <input
              value={answers.medsWhich || ''}
              onChange={e => setAnswers({ ...answers, medsWhich: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter' && (answers.medsWhich || '').trim()) goNextNow(); }}
              placeholder={t('which_meds_placeholder')}
              className="mt-3 w-full px-3 py-2 rounded border bg-transparent"
              style={{ borderColor: 'var(--border-color)', color: 'var(--foreground)' }}
            />
          )}
          <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-color)' }}>{t('back')}</button>
            <TriageButton onClick={next}>{t('next')}</TriageButton>
          </div>
        </QuestionCard>
      )}

      {step === 5 && (
        <QuestionCard title={t('self_harm')}>
          <div className="flex gap-3">
            <OptionPill active={answers.selfHarmThoughts} onClick={() => { setAnswers({ ...answers, selfHarmThoughts: true }); setTimeout(() => goNextNow(), 400); }}>{t('yes')}</OptionPill>
            <OptionPill active={!answers.selfHarmThoughts} onClick={() => { setAnswers({ ...answers, selfHarmThoughts: false }); setTimeout(() => goNextNow(), 400); }}>{t('no')}</OptionPill>
          </div>
          {answers.selfHarmThoughts && (
            <div className="mt-3 text-sm" style={{ color: '#a61b1b' }}>
              {t('self_harm_message')}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-color)' }}>{t('back')}</button>
            <TriageButton onClick={next}>{t('next')}</TriageButton>
          </div>
        </QuestionCard>
      )}

      {step === 6 && (
        <QuestionCard title={t('overwhelm_frequency')}>
          <div className="flex flex-wrap gap-2">
            {FREQ_OPTIONS.map((f: (typeof FREQ_OPTIONS)[number]) => (
              <OptionPill key={f} active={answers.overwhelmFrequency === f} onClick={() => { setAnswers({ ...answers, overwhelmFrequency: f }); goNextNow(); }}>{f}</OptionPill>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-color)' }}>{t('back')}</button>
            <TriageButton disabled={!canGoNext(6)} onClick={next}>{t('next')}</TriageButton>
          </div>
        </QuestionCard>
      )}

      {step === 7 && (
        <QuestionCard title={t('has_someone_to_talk')}>
          <div className="flex gap-3">
            <OptionPill active={answers.hasSomeoneToTalk} onClick={() => { setAnswers({ ...answers, hasSomeoneToTalk: true }); goNextNow(); }}>{t('yes')}</OptionPill>
            <OptionPill active={!answers.hasSomeoneToTalk} onClick={() => { setAnswers({ ...answers, hasSomeoneToTalk: false }); goNextNow(); }}>{t('no')}</OptionPill>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-color)' }}>{t('back')}</button>
            <TriageButton onClick={next}>{t('next')}</TriageButton>
          </div>
        </QuestionCard>
      )}

      {step === 8 && (
        <QuestionCard title={t('age')}>
          <input type="number" min={1} max={120} value={answers.age ?? ''} onChange={e => setAnswers({ ...answers, age: e.target.value ? Number(e.target.value) : undefined })} placeholder={t('age_placeholder')} className="w-full px-3 py-2 rounded border bg-transparent" style={{ borderColor: 'var(--border-color)', color: 'var(--foreground)' }} />
          <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-color)' }}>{t('back')}</button>
            <TriageButton disabled={loading || !(typeof answers.age === 'number' && Number.isInteger(answers.age) && answers.age >= 1 && answers.age <= 120)} onClick={finish}>{t('finish')}</TriageButton>
          </div>
        </QuestionCard>
      )}
    </div>
  );
} 