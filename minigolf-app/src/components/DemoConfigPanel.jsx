import { useState } from 'react';

function DemoConfigPanel({ config, onConfigChange, onClose }) {
  const [local, setLocal] = useState({ ...config });

  const handleHoleChange = (holeNumber) => {
    setLocal({
      ...local,
      holeNumber,
      isRegistrationHole: holeNumber === 1,
      isFinalHole: holeNumber === 9,
    });
  };

  const handleApply = () => {
    onConfigChange(local);
    onClose();
  };

  return (
    <div className="config-overlay" onClick={onClose}>
      <div className="config-panel" onClick={(e) => e.stopPropagation()}>
        <div className="config-header">
          <h2>Demo Settings</h2>
          <button className="config-close" onClick={onClose}>&times;</button>
        </div>

        <div className="config-body">
          {/* Hole Number */}
          <div className="config-field">
            <label>Hole Number</label>
            <div className="hole-selector">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  className={`hole-btn ${local.holeNumber === n ? 'active' : ''}`}
                  onClick={() => handleHoleChange(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Course */}
          <div className="config-field">
            <label>Course</label>
            <div className="course-selector">
              {['A', 'B'].map((c) => (
                <button
                  key={c}
                  className={`course-btn ${local.course === c ? 'active' : ''}`}
                  onClick={() => setLocal({ ...local, course: c })}
                >
                  Course {c}
                </button>
              ))}
            </div>
          </div>

          {/* Registration Hole */}
          <div className="config-field">
            <label>Registration Hole</label>
            <button
              className={`toggle-btn ${local.isRegistrationHole ? 'on' : 'off'}`}
              onClick={() =>
                setLocal({ ...local, isRegistrationHole: !local.isRegistrationHole })
              }
            >
              {local.isRegistrationHole ? 'ON' : 'OFF'}
            </button>
            <span className="config-hint">
              Auto-set when hole = 1
            </span>
          </div>

          {/* Final Hole */}
          <div className="config-field">
            <label>Final Hole</label>
            <button
              className={`toggle-btn ${local.isFinalHole ? 'on' : 'off'}`}
              onClick={() =>
                setLocal({ ...local, isFinalHole: !local.isFinalHole })
              }
            >
              {local.isFinalHole ? 'ON' : 'OFF'}
            </button>
            <span className="config-hint">
              Auto-set when hole = 9
            </span>
          </div>
        </div>

        <div className="config-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Apply &amp; Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default DemoConfigPanel;
