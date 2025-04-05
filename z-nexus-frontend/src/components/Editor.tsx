import { useState } from 'react';

export default function Editor() {
  const [code, setCode] = useState('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <div>
      <h1>Blind Coding Editor</h1>
      <textarea
        value={code}
        onChange={handleCodeChange}
        style={{ width: '100%', height: '300px', fontSize: '16px' }}
      />
    </div>
  );
}
