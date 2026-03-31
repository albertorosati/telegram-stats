'use client';

import { useEffect, useId, useState } from 'react';
import { motion } from 'framer-motion';

import { parseZipFile, revokeAllBlobUrls } from '../../lib/analytics/parser';
import type { WrappedData } from '../../lib/analytics/types';
import { WRAPPED_DASHBOARD_STYLES } from '../../lib/exporter';
import { WrappedDashboard } from '../../components/wrapped/WrappedDashboard';

export default function WrappedPage() {
  const inputId = useId();
  const [data, setData] = useState<WrappedData | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Carica uno ZIP di Telegram per iniziare.');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      revokeAllBlobUrls();
    };
  }, []);

  async function handleFile(file: File): Promise<void> {
    setIsParsing(true);
    setError(null);
    setProgress(0);
    setProgressLabel('Sto preparando lo ZIP…');
    revokeAllBlobUrls();

    try {
      const wrapped = await parseZipFile(file, (step, percent) => {
        setProgress(percent);
        setProgressLabel(step);
      });
      setData(wrapped);
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : 'Impossibile elaborare il file ZIP.';
      setError(message);
      setData(null);
    } finally {
      setIsParsing(false);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: WRAPPED_DASHBOARD_STYLES }} />
      {data ? (
        <WrappedDashboard data={data} />
      ) : (
        <div className='wrapped-shell'>
          <div className='wrapped-page'>
            <motion.section className='wrapped-panel wrapped-hero' initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
              <div className='wrapped-upload-card'>
                <div>
                  <p className='wrapped-kicker'>Import archivio Telegram</p>
                  <h1 className='wrapped-title'>
                    <span className='wrapped-title-gradient'>The Telegram</span>
                    <br />
                    Wrapped
                  </h1>
                  <p className='wrapped-subtitle'>
                    Carica lo ZIP dell'esportazione direttamente nel browser. Il parser estrae `result.json`, ricostruisce sticker e media come blob locali e poi alimenta sia la dashboard React sia l'esportazione autonoma.
                  </p>
                </div>

                <label className='wrapped-upload-button' htmlFor={inputId}>
                  {isParsing ? 'Sto leggendo lo ZIP…' : 'Scegli lo ZIP di Telegram'}
                </label>
                <input
                  accept='.zip,application/zip'
                  id={inputId}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void handleFile(file);
                    }
                  }}
                  type='file'
                />

                <div className='wrapped-progress'>
                  <div className='wrapped-progress-bar' style={{ width: `${progress}%` }} />
                </div>

                <p className='wrapped-status'>{progressLabel}</p>
                {error ? <p className='wrapped-error'>{error}</p> : null}
                <p className='wrapped-footnote'>Zero backend. Analisi ed esportazione avvengono interamente in locale nel browser.</p>
              </div>
            </motion.section>
          </div>
        </div>
      )}
    </>
  );
}