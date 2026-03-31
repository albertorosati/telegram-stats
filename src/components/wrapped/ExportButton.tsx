'use client';

import { useState, useTransition } from 'react';

import type { WrappedData } from '../../lib/analytics/types';
import { exportToSingleHTML, getWrappedExportFileName } from '../../lib/exporter';

interface ExportButtonProps {
  data: WrappedData;
}

export function ExportButton({ data }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function handleExport(): Promise<void> {
    setIsExporting(true);
    setError(null);

    try {
      const html = await exportToSingleHTML(data);
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = getWrappedExportFileName(data.chatName);
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : 'Esportazione non riuscita.';
      startTransition(() => {
        setError(message);
      });
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div>
      <button className='wrapped-export-button' disabled={isExporting} onClick={handleExport} type='button'>
        {isExporting ? 'Sto costruendo l\'HTML autonomo…' : 'Esporta HTML autonomo'}
      </button>
      {error ? <p className='wrapped-error'>{error}</p> : null}
    </div>
  );
}