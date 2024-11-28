import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PromptGenerator = ({
  inputPlaceholder = "Enter your prompt and press Enter to analyze",
  inputClassName = "custom-input",
  resultClassName = "result",
  loadingClassName = "loading-spinner",
  spinner = null,
  onAnalyze = null,
  analyzeLogic = null,
  autoAnalyze = true,
  allowMultiline = true,
}) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultAnalyzeLogic = async (inputPrompt) => {
    const words = inputPrompt.trim().split(/\s+/);
    const complexityLevel =
      inputPrompt.length < 50
        ? 'Low Complexity'
        : inputPrompt.length < 100
        ? 'Medium Complexity'
        : 'High Complexity';
    const promptType = words.some((word) =>
      ['how', 'why', 'what', 'explain'].includes(word.toLowerCase())
    )
      ? 'Analytical Query'
      : 'Declarative Statement';
    const intentType = words.some((word) =>
      ['create', 'generate', 'develop', 'design'].includes(word.toLowerCase())
    )
      ? 'Creative Intent'
      : 'Informative Intent';

    return `Prompt Analysis Report\n\nPrompt Details:\n- Total Characters: ${
      inputPrompt.length
    }\n- Word Count: ${
      words.length
    }\n- Complexity: ${complexityLevel}\n- Prompt Type: ${promptType}\n- Intent: ${intentType}\n\nAnalysis Summary:\nThe prompt suggests a ${complexityLevel.toLowerCase()} communication with ${promptType.toLowerCase()} characteristics.\nThe primary intent appears to be ${intentType.toLowerCase()}, indicating a ${
      intentType === 'Creative Intent'
        ? 'focus on generating or developing new ideas'
        : 'desire for structured, informative content'
    }.\n`;
  };

  const handleAnalysis = async (inputPrompt) => {
    if (!inputPrompt.trim()) {
      setResult('Please enter a valid prompt');
      return;
    }

    setIsLoading(true);
    try {
      const analysisResult =
        analyzeLogic !== null
          ? await analyzeLogic(inputPrompt)
          : await defaultAnalyzeLogic(inputPrompt);

      setResult(analysisResult);
      if (onAnalyze) onAnalyze(analysisResult);
    } catch {
      setResult('An error occurred during prompt analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && autoAnalyze) {
      e.preventDefault();
      handleAnalysis(prompt);
    } else if (e.key === 'Enter' && e.shiftKey && allowMultiline) {
      setPrompt((prevPrompt) => `${prevPrompt}\n`);
    }
  };

  return (
    <div className="prompt-generator">
      <div className="result-container">
        {isLoading ? (
          spinner || (
            <div className={loadingClassName}>
              <div className="spinner"></div>
            </div>
          )
        ) : (
          <pre className={resultClassName}>
            {result || 'Prompt analysis will be displayed here'}
          </pre>
        )}
      </div>

      <div className="input-container">
        <textarea
          type="text"
          placeholder={inputPlaceholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className={inputClassName}
        />
      </div>
    </div>
  );
};

PromptGenerator.propTypes = {
  inputPlaceholder: PropTypes.string,
  inputClassName: PropTypes.string,
  resultClassName: PropTypes.string,
  loadingClassName: PropTypes.string,
  spinner: PropTypes.node, // Custom spinner component
  onAnalyze: PropTypes.func,
  analyzeLogic: PropTypes.func,
  autoAnalyze: PropTypes.bool,
  allowMultiline: PropTypes.bool,
};

export default PromptGenerator;
