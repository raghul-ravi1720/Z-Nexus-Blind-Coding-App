import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Editor() {
  const [code, setCode] = useState('// Write your solution here');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('warning'); // 'warning', 'error', 'info'
  const [currentProblem] = useState({
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
    starterCode: `function twoSum(nums, target) {
    // Your solution here
    
};`
  });
  
  const navigate = useNavigate();
  const escapeCount = useRef(0);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setCode(currentProblem.starterCode);
  }, [currentProblem]);

  useEffect(() => {
    const element = document.documentElement;

    function enterFullscreen(el: HTMLElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).mozRequestFullScreen) {
        (el as any).mozRequestFullScreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      } else if ((el as any).msRequestFullscreen) {
        (el as any).msRequestFullscreen();
      }
    }

    // Initial entry on load
    setTimeout(() => {
      enterFullscreen(element);
      showToastNotification('Entering fullscreen mode for secure coding environment', 'info');
    }, 500);

    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;

      if (!isFullscreen) {
        escapeCount.current += 1;

        if (escapeCount.current >= 3) {
          showToastNotification('You exited fullscreen too many times. Logging out...', 'error');
          setTimeout(() => {
            handleLogout();
          }, 2000);
        } else {
          const remaining = 3 - escapeCount.current;
          showToastNotification(
            `Please stay in fullscreen mode. You have ${remaining} warning${remaining === 1 ? '' : 's'} left.`, 
            'warning'
          );
          setTimeout(() => {
            enterFullscreen(element); // Re-enter fullscreen after toast notification
          }, 1500);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToastNotification = (message: string, type: 'warning' | 'error' | 'info') => {
    // Clear any existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    // Set toast message and type
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    // Auto-hide the toast after 5 seconds
    toastTimeoutRef.current = window.setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleResetCode = () => {
    setCode(currentProblem.starterCode);
    showToastNotification('Code reset to starter code', 'info');
  };

  const handleRunCode = () => {
    showToastNotification('Running code...', 'info');
    // Code execution logic would go here
  };

  const handleSubmitCode = () => {
    showToastNotification('Submitting solution...', 'info');
    // Code submission logic would go here
  };

  // Generate difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return '#00af9b';
      case 'medium': return '#ffb800';
      case 'hard': return '#ff2d55';
      default: return '#00af9b';
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            backgroundColor: 
              toastType === 'warning' ? '#ff9800' : 
              toastType === 'error' ? '#f44336' : 
              '#2196f3',
            color: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            opacity: 0.9,
            minWidth: '300px',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{
          margin: 0,
          color: '#2c3e50',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>Blind Coding</h1>

        <div>
          <button
            onClick={() => {
              const element = document.documentElement;
              if (element.requestFullscreen) {
                element.requestFullscreen();
              } else if ((element as any).mozRequestFullScreen) {
                (element as any).mozRequestFullScreen();
              } else if ((element as any).webkitRequestFullscreen) {
                (element as any).webkitRequestFullscreen();
              } else if ((element as any).msRequestFullscreen) {
                (element as any).msRequestFullscreen();
              }
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Fullscreen
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div style={{
        display: 'flex',
        flexGrow: 1,
        height: 'calc(100vh - 52px)' // Subtract header height
      }}>
        {/* Problem Statement (Left Side) */}
        <div style={{
          width: '40%',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ 
              margin: 0,
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {currentProblem.title}
            </h2>
            <span style={{
              marginLeft: '12px',
              padding: '4px 10px',
              borderRadius: '16px',
              backgroundColor: getDifficultyColor(currentProblem.difficulty),
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {currentProblem.difficulty}
            </span>
          </div>
          
          <div style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6',
            fontSize: '15px',
            color: '#333',
            fontFamily: 'Arial, sans-serif'
          }}>
            {currentProblem.description}
          </div>
        </div>
        
        {/* Code Editor (Right Side) */}
        <div style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1e1e1e'
        }}>
          {/* Editor Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: '#252526',
            padding: '8px 16px',
            borderBottom: '1px solid #333'
          }}>
            <div style={{
              padding: '6px 16px',
              backgroundColor: '#1e1e1e',
              color: '#fff',
              borderTop: '2px solid #0078d7',
              fontSize: '14px'
            }}>
              solution.js
            </div>
          </div>
          
          {/* Code Area */}
          <textarea
            value={code}
            onChange={handleCodeChange}
            style={{
              flexGrow: 1,
              fontSize: '15px',
              padding: '16px',
              border: 'none',
              outline: 'none',
              fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              resize: 'none',
              lineHeight: '1.5'
            }}
          />
          
          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#252526',
            borderTop: '1px solid #333'
          }}>
            <button
              onClick={handleResetCode}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Reset
            </button>
            
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <button
                onClick={handleRunCode}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Run
              </button>
              <button
                onClick={handleSubmitCode}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Warning Footer */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '6px 12px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 100
      }}>
        Press ESC to exit fullscreen mode (3 warnings will trigger automatic logout)
      </div>
    </div>
  );
}

export default Editor;