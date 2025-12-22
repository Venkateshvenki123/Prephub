import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// ✅ FIXED PDF WORKER - This solves 99% of issues
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Notes = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [viewingPdf, setViewingPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    alert('PDF failed to load. Please try another file.');
  };

  const handlePdfUpload = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer?.files || []);
    files.forEach(file => {
      // Accept PDFs by MIME type or by extension fallback
      if (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf')) {
        const url = URL.createObjectURL(file);
        setPdfFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          url,
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
          file
        }]);
      }
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handlePdfUpload(e);
  };

  const downloadPdf = (pdfFile) => {
    const link = document.createElement('a');
    link.href = pdfFile.url;
    link.download = pdfFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deletePdf = (id) => {
    const pdfToDelete = pdfFiles.find(p => p.id === id);
    if (pdfToDelete) {
      URL.revokeObjectURL(pdfToDelete.url);
    }
    setPdfFiles(prev => prev.filter(p => p.id !== id));
    if (viewingPdf?.id === id) {
      setViewingPdf(null);
    }
  };

  const nextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  const prevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));

  // Keep a ref to pdfFiles so we can revoke object URLs on unmount
  const pdfFilesRef = useRef(pdfFiles);
  useEffect(() => { pdfFilesRef.current = pdfFiles; }, [pdfFiles]);
  useEffect(() => {
    return () => {
      // Revoke any remaining object URLs on unmount
      pdfFilesRef.current.forEach(p => {
        try { URL.revokeObjectURL(p.url); } catch (e) { /* ignore */ }
      });
    };
  }, []);

  return (
    <div className="container">
      {/* HEADER */}
      <section className="hero" style={{textAlign: 'center', paddingBottom: '2rem'}}>
        <h1 style={{fontSize: '3.5rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          📚 PDF Notes Portal
        </h1>
        <p style={{fontSize: '1.3rem', color: '#94a3b8'}}>
          Upload • View Online • Share • Download
        </p>
      </section>

      {/* UPLOAD DROP ZONE */}
      <section style={{marginBottom: '3rem'}}>
        <div 
          className="card"
          style={{
            padding: '4rem 2rem', 
            textAlign: 'center', 
            border: '3px dashed #3b82f6',
            background: 'rgba(59,130,246,0.05)', 
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={handlePdfUpload}
            style={{display: 'none'}}
          />
          <div style={{fontSize: '5rem', marginBottom: '1.5rem'}}>📄</div>
          <h3 style={{marginBottom: '1rem'}}>Drop PDF Here or Click to Browse</h3>
          <p style={{color: '#94a3b8'}}>Supports multiple files • View online instantly</p>
          <div style={{marginTop: '1.5rem', color: '#60a5fa', fontWeight: '600'}}>
            {pdfFiles.length} PDF{pdfFiles.length !== 1 ? 's' : ''} loaded
          </div>
        </div>
      </section>

      {/* PDF LIST */}
      {pdfFiles.length > 0 && (
        <>
          <h2 style={{fontSize: '2.25rem', marginBottom: '2rem'}}>📋 Your PDFs ({pdfFiles.length})</h2>
          <div className="card-grid">
            {pdfFiles.map((pdf) => (
              <div key={pdf.id} className="card" style={{padding: '2.5rem'}}>
                <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
                  <div style={{
                    width: '80px', height: '80px', background: '#3b82f6',
                    borderRadius: '12px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '2.5rem', color: 'white'
                  }}>
                    📄
                  </div>
                  <div style={{flex: 1}}>
                    <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>
                      {pdf.name}
                    </h3>
                    <div style={{color: '#94a3b8'}}>
                      {pdf.size} • Publicly shared
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: '1rem'}}>
                    <button 
                      className="btn btn-primary"
                      onClick={() => { setViewingPdf(pdf); setPageNumber(1); }}
                      style={{padding: '1rem 1.75rem'}}
                    >
                      👁️ View Online
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => downloadPdf(pdf)}
                      style={{padding: '1rem 1.75rem'}}
                    >
                      ⬇️ Download
                    </button>
                    <button 
                      onClick={() => deletePdf(pdf.id)}
                      style={{
                                              background: 'rgba(239,68,68,0.2)', 
                      color: '#f87171', 
                      border: 'none',
                      padding: '1rem 1.25rem', 
                      borderRadius: '10px', 
                      cursor: 'pointer'
                    }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PDF VIEWER MODAL - ONLINE PREVIEW */}
      {viewingPdf && (
        <div 
          style={{
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.95)',
            zIndex: 10000, 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '2rem',
            overflow: 'auto'
          }}
          onClick={() => setViewingPdf(null)}
        >
          <div 
            style={{
              background: 'rgba(15,23,42,0.98)', 
              borderRadius: '20px', 
              maxWidth: '1000px', 
              maxHeight: '90vh', 
              overflow: 'auto',
              margin: 'auto', 
              position: 'relative', 
              minHeight: '400px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR */}
            <div style={{
              position: 'sticky', 
              top: 0, 
              background: 'rgba(15,23,42,0.98)',
              padding: '1.5rem', 
              borderBottom: '1px solid rgba(59,130,246,0.3)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              zIndex: 10
            }}>
              <div>
                <h3 style={{margin: 0, color: '#60a5fa', fontSize: '1.5rem'}}>
                  {viewingPdf.name}
                </h3>
                <div style={{color: '#94a3b8', fontSize: '1rem'}}>
                  Page {pageNumber} of {numPages || '?'}
                </div>
              </div>
              <div style={{display: 'flex', gap: '1rem'}}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => downloadPdf(viewingPdf)}
                  style={{padding: '0.75rem 1.5rem'}}
                >
                  ⬇️ Download PDF
                </button>
                <button 
                  className="btn"
                  onClick={() => setViewingPdf(null)}
                  style={{padding: '0.75rem 1.5rem', background: 'rgba(239,68,68,0.2)', color: '#f87171'}}
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* PDF PAGES */}
            <div style={{padding: '2rem', textAlign: 'center'}}>
              {viewingPdf ? (
                <Document
                  file={viewingPdf.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div style={{padding: '6rem 2rem', color: '#94a3b8'}}>
                      <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📄</div>
                      Loading PDF...
                    </div>
                  }
                  error={
                    <div style={{padding: '6rem 2rem', color: '#f87171'}}>
                      <div style={{fontSize: '4rem', marginBottom: '1rem'}}>❌</div>
                      Failed to load PDF. Try another file.
                    </div>
                  }
                >
                  <Page 
                    pageNumber={pageNumber} 
                    width={Math.min(650, window.innerWidth - 80)}
                    renderTextLayer={false}
                    renderAnnotationLayer={true}
                  />
                </Document>
              ) : null}
            </div>

            {/* PAGE NAVIGATION */}
            {numPages > 1 && (
              <div style={{
                padding: '1.5rem 2rem', 
                background: 'rgba(15,23,42,0.98)',
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1rem', 
                alignItems: 'center'
              }}>
                <button 
                  onClick={prevPage} 
                  disabled={pageNumber <= 1}
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    opacity: pageNumber <= 1 ? 0.5 : 1,
                    cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← Previous
                </button>
                <span style={{color: '#94a3b8'}}>
                  Page {pageNumber} of {numPages}
                </span>
                <button 
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    opacity: pageNumber >= numPages ? 0.5 : 1,
                    cursor: pageNumber >= numPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!pdfFiles.length && !viewingPdf && (
        <div style={{textAlign: 'center', padding: '6rem 2rem'}}>
          <div style={{fontSize: '6rem', color: '#94a3b8', marginBottom: '2rem'}}>📄</div>
          <h2 style={{fontSize: '2.5rem', color: '#94a3b8', marginBottom: '1rem'}}>
            No PDFs Yet
          </h2>
          <p style={{color: '#64748b', fontSize: '1.25rem', maxWidth: '500px', margin: '0 auto 3rem'}}>
            Drag and drop your first PDF above to get started. 
            View, share, and download instantly with others.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notes;

