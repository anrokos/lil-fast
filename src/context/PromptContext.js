import { createContext, useState, useContext } from "react";

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
    const [prompt, setPrompt] = useState('Imagine all the trees are alive')
    const [numIterations, setNumIterations] = useState(2)


  return (
    <PromptContext.Provider value={{
        prompt,
        setPrompt,
        numIterations,
        setNumIterations
    }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => useContext(PromptContext);