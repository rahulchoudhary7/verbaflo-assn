import { useState } from 'react';
import { Upload, Key, FileText } from 'lucide-react';

const ResumeGenerator = () => {
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState(null); // Link to download HTML


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid PDF file.');
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !apiKey) {
      setError('Please provide both a PDF file and an API key.');
      return;
    }

    setIsLoading(true);
    setError('');
    setDownloadLink(null); // Reset download link


    const formData = new FormData();
    formData.append('api_key', apiKey);
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/generate-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error || 'Failed to generate the resume.');
        setIsLoading(false);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);

    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while generating the resume.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">LinkedIn to HTML Resume Generator</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex items-center space-x-4">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      {file ? file.name : 'Upload LinkedIn PDF'}
                    </label>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Key className="h-6 w-6 text-gray-400" />
                  <div className="relative">
                    <input
                      id="api-key"
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter Google Gemini Key"
                      className="h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <FileText className="h-5 w-5 mr-2" />
                      Generate Resume
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && <div className="mt-4 text-red-500">{error}</div>}

            {downloadLink && (
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={downloadLink}
                  download="resume.html"
                  className="bg-green-500 hover:bg-green-400 text-white text-center py-2 px-4 rounded"
                >
                  Download Generated Resume
                </a>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => window.open(downloadLink, '_blank')}
                >
                  View Generated Resume
                </button>
               
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
