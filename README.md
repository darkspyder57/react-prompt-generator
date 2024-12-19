# React Prompt Generator [NPM Package]

A react component packed inside a NPM package that makes your life easier if you are a developer and you want to build a AI prompting environment.
This is a react component that takes user prompt and analyses it and displays result on the canvas.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

Install the npm package using:

```sh
npm react-prompt-generator@1.0.0
```

## Usage

Import directly in the component where you want to use this:
like I have used it inside the App.js file in my react application,
use the props mentioned in the code to modify the prompt.

```bash
import './App.css';
import PromptGenerator from "react-prompt-generator"

function App() {
  const handleCustomAnalysis = async (prompt) => {
    return `Custom analysis for: ${prompt}`;
  };
  return (
    <div className="App">
      <PromptGenerator
        inputPlaceholder="Enter your prompt to analyse"
        inputClassName="custom-input"
        resultClassName="result"
        spinner={<div className="spinner">Loading...</div>}
        onAnalyze={(result) => console.log(result)}
        analyzeLogic={handleCustomAnalysis}
        autoAnalyze={true}
        allowMultiline={true}
      />
    </div>
  );
}

export default App;

```

It is well responsive so you don't have to worry about responsiveness.


## Contributing

It is still version 1.0.1 so I am up for collaborations. Even the smallest improvements matter.
