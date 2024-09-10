import React from 'react';
import { CanvasProvider } from './context/CanvasContext';
import { PromptProvider } from './context/PromptContext';

import DrawingApp from './components/DrawingApp';
import Header from './components/Header';

function App() {
  return (
    <div className="p-2 w-full h-screen">
      <CanvasProvider>
        <Header />
        <PromptProvider>
          <DrawingApp />
        </PromptProvider>
      </CanvasProvider>
    </div>
  );
}

export default App;