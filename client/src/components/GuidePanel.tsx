import React, { useState } from 'react';

export default function GuidePanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100,
          background: '#7cb342',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 20px',
          color: '#1a1f16',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Nunito, sans-serif'
        }}
      >
        <span style={{ fontSize: '20px' }}>📖</span>
        How Canopi Works
      </button>

      {/* Guide Panel Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fade-in"
            style={{
              background: '#252b1f',
              borderRadius: '32px',
              padding: '32px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid #5a6b3c',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#7cb342', fontSize: '28px', margin: 0 }}>🌿 How Canopi Works</h2>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#e8e4d9',
                  padding: '8px'
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ marginBottom: '28px', lineHeight: '1.6', opacity: 0.9 }}>
              Canopi helps you break big dreams into actionable steps using a botanical metaphor.<br />
              Everything nests: <strong>Gardens</strong> contain <strong>Plots</strong>, Plots contain <strong>Seeds</strong>, and Seeds contain <strong>Tasks</strong>.
            </p>

            {/* Grid of explanations */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {/* Garden */}
              <div style={{ background: 'rgba(26,31,22,0.6)', borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🏡</div>
                <h3 style={{ color: '#7cb342', marginBottom: '8px', fontSize: '18px' }}>Garden</h3>
                <p style={{ fontSize: '13px', opacity: 0.8 }}>Your big life category — like "Career" or "Writing". The broadest container.</p>
              </div>

              {/* Plot */}
              <div style={{ background: 'rgba(26,31,22,0.6)', borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🌱</div>
                <h3 style={{ color: '#7cb342', marginBottom: '8px', fontSize: '18px' }}>Plot</h3>
                <p style={{ fontSize: '13px', opacity: 0.8 }}>A meaningful goal — like "Land a Job". Plots fuel the bigger picture.</p>
              </div>

              {/* Seed */}
              <div style={{ background: 'rgba(26,31,22,0.6)', borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🫘</div>
                <h3 style={{ color: '#7cb342', marginBottom: '8px', fontSize: '18px' }}>Seed</h3>
                <p style={{ fontSize: '13px', opacity: 0.8 }}>A short-term goal — like "Strengthen LinkedIn". Concrete and achievable.</p>
              </div>

              {/* Task */}
              <div style={{ background: 'rgba(26,31,22,0.6)', borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>✅</div>
                <h3 style={{ color: '#7cb342', marginBottom: '8px', fontSize: '18px' }}>Task</h3>
                <p style={{ fontSize: '13px', opacity: 0.8 }}>The smallest action step. Complete all tasks and your Seed blooms into a flower! 🌸</p>
              </div>
            </div>

            {/* Example Journey */}
            <div style={{ background: 'rgba(124,179,66,0.1)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(124,179,66,0.3)' }}>
              <h3 style={{ color: '#7cb342', marginBottom: '16px', fontSize: '18px' }}>🌻 Example Journey</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>🏡</span>
                <span style={{ fontWeight: 'bold' }}>Career</span>
                <span style={{ opacity: 0.6 }}>→</span>
                <span style={{ fontSize: '24px' }}>🌱</span>
                <span style={{ fontWeight: 'bold' }}>Land a Job</span>
                <span style={{ opacity: 0.6 }}>→</span>
                <span style={{ fontSize: '24px' }}>🫘</span>
                <span style={{ fontWeight: 'bold' }}>Strengthen LinkedIn</span>
              </div>
              <div style={{ paddingLeft: '20px', borderLeft: '2px solid #7cb342' }}>
                <div style={{ marginBottom: '8px' }}>☑ Update profile headline</div>
                <div style={{ marginBottom: '8px' }}>☑ Connect with 10 professionals</div>
                <div>☐ Post 3 industry articles</div>
              </div>
              <p style={{ marginTop: '16px', fontSize: '13px', fontStyle: 'italic', opacity: 0.8 }}>
                Complete all tasks → Seed becomes a flower! 🌸
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '12px',
                background: '#7cb342',
                border: 'none',
                borderRadius: '40px',
                color: '#1a1f16',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Start Growing
            </button>
          </div>
        </div>
      )}
    </>
  );
}