import React, { useState, useEffect } from 'react';

interface FileUploaderProps {
    onFileSelect: (file: File | null, extractedText: string) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
    const [fileName, setFileName] = useState<string>('');
    const [fileSize, setFileSize] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'reading' | 'success' | 'error'>('idle');
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setFileSize(`${(file.size / 1024).toFixed(2)} KB`);
        setStatus('reading');

        if (file.type === 'application/pdf') {
            const fileReader = new FileReader();

            fileReader.onload = async function () {
                try {
                    // Global window object එකෙන් pdfjsLib ලබා ගැනීම
                    const pdfjsLib = (window as any).pdfjsLib;

                    if (!pdfjsLib) {
                        throw new Error("PDF library not loaded from CDN yet. Please refresh.");
                    }

                    // Worker එක සඳහා CDN path එක සෘජුවම ලබා දීම
                    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

                    const typedarray = new Uint8Array(this.result as ArrayBuffer);
                    const loadingTask = pdfjsLib.getDocument({ data: typedarray });
                    const pdf = await loadingTask.promise;

                    let completeText = "";

                    // PDF පිටු එකින් එක කියවීම
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items
                            .map((item: any) => item.str || '')
                            .join(' ');
                        completeText += pageText + "\n";
                    }

                    const cleanText = completeText.trim();

                    if (cleanText.length < 10) {
                        throw new Error("Garbled text or scanned image PDF");
                    }

                    setStatus('success');
                    onFileSelect(file, cleanText);

                } catch (error) {
                    console.error("Global PDF Reading Error:", error);
                    setStatus('error');
                    alert("Failed to read PDF text. Make sure it's a standard text-based PDF!");
                    onFileSelect(file, "");
                }
            };

            fileReader.readAsArrayBuffer(file);
        } else {
            setStatus('error');
            alert("Please upload a valid PDF file.");
            onFileSelect(null, "");
        }
    };

    const handleClear = () => {
        setFileName('');
        setFileSize('');
        setStatus('idle');
        onFileSelect(null, '');
    };

    if (!isMounted) {
        return <div className="w-full h-32 bg-slate-50 rounded-xl animate-pulse" />;
    }

    return (
        <div className="w-full">
            {status === 'idle' ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/80 transition duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-1">
                        <svg className="w-8 h-8 text-slate-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm font-semibold text-slate-600">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-400">PDF (Max 5MB)</p>
                    </div>
                    <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                </label>
            ) : (
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50 flex items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0 ${
                            status === 'reading' ? 'bg-amber-500 animate-pulse' :
                                status === 'error' ? 'bg-red-500' : 'bg-blue-600'
                        }`}>
                            <span className="text-[10px] opacity-80 uppercase">PDF</span>
                            {status === 'reading' ? (
                                <span className="text-[9px] mt-1 font-medium animate-bounce">...</span>
                            ) : (
                                <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-slate-700 truncate max-w-[180px]">{fileName}</span>
                            <span className="text-xs text-slate-400">
                                {status === 'reading' ? 'Extracting text...' :
                                    status === 'error' ? 'Failed to read' : fileSize}
                            </span>
                        </div>
                    </div>
                    <button type="button" onClick={handleClear} className="text-slate-400 hover:text-red-500 transition duration-150 p-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}