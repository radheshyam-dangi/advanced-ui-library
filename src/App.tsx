// src/App.tsx
import React, { useState, useEffect } from 'react';
import "./index.css";
import './App.css';

import * as CoreUI from './components';

const componentRegistry: Record<string, { component: React.ComponentType<any>; schema: any; propCount: number }> = {
  Button: { component: CoreUI.Button, schema: CoreUI.buttonDocSchema, propCount: 15 },
  Input: { component: CoreUI.Input, schema: CoreUI.inputDocSchema, propCount: 12 },
  Card: { component: CoreUI.Card || (() => null), schema: CoreUI.cardDocSchema, propCount: 11 },
  Badge: { component: CoreUI.Badge || (() => null), schema: CoreUI.badgeDocSchema, propCount: 10 },
  Modal: { 
    component: (props: any) => {
      // Intercept onClose to automatically toggle the playground's active state
      const handleClose = () => {
        const openCheckbox = document.getElementById('ctrl-open') as HTMLInputElement | null;
        if (openCheckbox) {
          openCheckbox.click(); // Programmatically updates App.tsx state engine
        }
      };
      return <CoreUI.Modal {...props} onClose={props.onClose || handleClose} onConfirm={props.onConfirm || handleClose} />;
    }, 
    schema: CoreUI.modalDocSchema, 
    propCount: 9 
  },
  Toggle: { component: CoreUI.Toggle || (() => null), schema: CoreUI.toggleDocSchema, propCount: 10 },
  Select: { component: CoreUI.Select || (() => null), schema: CoreUI.selectDocSchema, propCount: 11 },
  Progress: { component: CoreUI.Progress, schema: CoreUI.progressDocSchema, propCount: 10 },
  Avatar: { component: CoreUI.Avatar || (() => null), schema: CoreUI.avatarDocSchema, propCount: 10 },
  Header: { component: CoreUI.Header, schema: CoreUI.headerDocSchema, propCount: 5 },
  Footer: { component: CoreUI.Footer, schema: CoreUI.footerDocSchema, propCount: 4 },
  Sidebar: { component: CoreUI.Sidebar, schema: CoreUI.sidebarDocSchema, propCount: 5 },
  MainContent: { component: CoreUI.MainContent, schema: CoreUI.mainContentDocSchema, propCount: 4 },
};

const COMPONENT_LIST = Object.keys(componentRegistry);
type TabType = 'Preview' | 'Code' | 'Specs' | 'Accessibility';

export default function App() {
  const [activeComponent, setActiveComponent] = useState<string>('Button');
  const [activeTab, setActiveTab] = useState<TabType>('Preview');
  const [componentProps, setComponentProps] = useState<Record<string, any>>({});

  const currentModule = componentRegistry[activeComponent];
  const currentDocs = currentModule?.schema;
  const SelectedComponent = currentModule?.component;
  const currentIndex = COMPONENT_LIST.indexOf(activeComponent);

  useEffect(() => {
    if (currentDocs?.propsList) {
      const defaultProps: Record<string, any> = {};
      currentDocs.propsList.forEach((prop: any) => {
        if (prop.default !== 'undefined' && prop.default !== 'null') {
          const cleanValue = prop.default.replace(/^['"]|['"]$/g, '');
          if (cleanValue === 'false') defaultProps[prop.name] = false;
          else if (cleanValue === 'true') defaultProps[prop.name] = true;
          else if (!isNaN(Number(cleanValue)) && cleanValue !== '') defaultProps[prop.name] = Number(cleanValue);
          else defaultProps[prop.name] = cleanValue;
        }
      });
      setComponentProps(defaultProps);
    } else {
      setComponentProps({});
    }
  }, [activeComponent, currentDocs]);

  const updateProp = (key: string, value: any) => {
    setComponentProps((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentIndex < COMPONENT_LIST.length - 1) {
      setActiveComponent(COMPONENT_LIST[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveComponent(COMPONENT_LIST[currentIndex - 1]);
    }
  };

  const renderDynamicControl = (prop: any) => {
    const value = componentProps[prop.name];
    if (prop.type === 'boolean') {
      return (
        <div key={prop.name} className="control-group checkbox-row">
          <input
            type="checkbox"
            id={`ctrl-${prop.name}`}
            checked={!!value}
            onChange={(e) => updateProp(prop.name, e.target.checked)}
          />
          <label htmlFor={`ctrl-${prop.name}`}>{prop.name}</label>
        </div>
      );
    }
    if (prop.type === 'number') {
      return (
        <div key={prop.name} className="control-group">
          <label>{prop.name}</label>
          <input
            type="number"
            value={value ?? 0}
            onChange={(e) => updateProp(prop.name, Number(e.target.value))}
          />
        </div>
      );
    }
    if (prop.type.includes('|')) {
      const options = prop.type.split('|').map((opt: string) => opt.trim().replace(/^['"]|['"]$/g, ''));
      return (
        <div key={prop.name} className="control-group">
          <label>{prop.name}</label>
          <select value={value ?? ''} onChange={(e) => updateProp(prop.name, e.target.value)}>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }
    return (
      <div key={prop.name} className="control-group">
        <label>{prop.name}</label>
        <input
          type="text"
          value={value ?? ''}
          placeholder={prop.default}
          onChange={(e) => updateProp(prop.name, e.target.value)}
        />
      </div>
    );
  };

  const renderComponentChildren = () => {
    if (activeComponent === 'Button') return componentProps.loadingText && componentProps.isLoading ? componentProps.loadingText : 'Click me';
    if (activeComponent === 'Card') return 'Card Content Block Content';
    if (activeComponent === 'Modal') return 'Interactive Dialog Context Windows';
    return null;
  };

  return (
    <div className="doc-site-container">
      <div className="doc-body">
        
        {/* SIDEBAR COMPONENT DIRECTORY LIST */}
        <aside className="doc-sidebar">
          <div className="sidebar-brand">
            <div className="brand-logo">C</div>
            <div>
              <div className="brand-name">Core Design Lab</div>
              <div className="brand-sub">Component Library</div>
            </div>
          </div>
          
          <div className="sidebar-title">ALL COMPONENTS</div>
          <nav>
            <ul>
              {COMPONENT_LIST.map((comp) => {
                const isSelected = activeComponent === comp;
                return (
                  <li key={comp}>
                    <button
                      className={`sidebar-link ${isSelected ? 'active' : ''}`}
                      onClick={() => setActiveComponent(comp)}
                    >
                      <div className="link-left-content">
                        {/* <div className={`mock-checkbox ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <span className="check-mark">✓</span>}
                        </div> */}
                        <span className="component-name-text">{comp}</span>
                      </div>
                      <span className="prop-count-badge">{componentRegistry[comp].propCount} props</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* WORKSPACE AREA CONTAINER */}
        <main className="doc-main-content">
          <div className="title-area">
            <h2>{activeComponent}</h2>
            <p className="description-text">{currentDocs?.description}</p>
            
            {/* META LABELS STRIP */}
            <div className="meta-badge-row">
              {/* <span className="meta-pill text-p">{componentRegistry[activeComponent].propCount} props</span> */}
              {/* <span className="meta-pill text-e">Exportable</span>
              <span className="meta-pill text-t">TypeScript</span> */}
            </div>
          </div>

          {/* TAB HEADERS ROW */}
          <div className="workspace-tabs-nav">
            {(['Preview', 'Code', 'Specs', 'Accessibility'] as TabType[]).map((tab) => (
              <button
                key={tab}
                className={`tab-nav-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'Preview' && '👁 Preview'}
                {tab === 'Code' && '</> Code'}
                {tab === 'Specs' && '☰ Specs'}
                {tab === 'Accessibility' && '♿ Accessibility'}
              </button>
            ))}
          </div>

          {/* ISOLATED VIEW CHANNELS SECTION */}
          <div className="tab-viewport-content">
            
            {/* TAB VIEW 1: PREVIEW MODE (CANVAS + CONTROLS SPLIT) */}
            {activeTab === 'Preview' && (
              <div className="workspace-grid">
                <section className="canvas-section">
                  <div className="live-preview-box">
                    {SelectedComponent && (
                      <SelectedComponent {...componentProps}>
                        {renderComponentChildren()}
                      </SelectedComponent>
                    )}
                  </div>
                </section>

                <section className="controls-section">
                  <div className="controls-form">
                    <div className="controls-header">Attributes Playground</div>
                    {currentDocs?.propsList && currentDocs.propsList.length > 0 ? (
                      currentDocs.propsList.map((prop: any) => renderDynamicControl(prop))
                    ) : (
                      <p className="fallback-text">No fields available.</p>
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* TAB VIEW 2: REAL-TIME CODE BLOCK SYNTAX */}
            {activeTab === 'Code' && (
              <section className="code-generation-box animated-fade-in">
                <pre>
                  <code>
                    {`<${activeComponent} ${Object.entries(componentProps)
                      .filter(([_, v]) => v !== undefined && v !== false && v !== '' && v !== 0)
                      .map(([k, v]) => typeof v === 'string' ? `${k}="${v}"` : `${k}={${v}}`)
                      .join(' ')} />`}
                  </code>
                </pre>
              </section>
            )}

            {/* TAB VIEW 3: FULL TECHNICAL SPECIFICATION SHEET */}
            {activeTab === 'Specs' && (
              <section className="specs-section animated-fade-in">
                <table className="props-table">
                  <thead>
                    <tr>
                      <th>Prop Name</th>
                      <th>Type Parameters</th>
                      <th>Fallback Default</th>
                      <th>Functional Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDocs?.propsList?.map((spec: any) => (
                      <tr key={spec.name}>
                        <td className="prop-name"><strong>{spec.name}</strong></td>
                        <td className="prop-type"><code>{spec.type}</code></td>
                        <td className="prop-default">{spec.default}</td>
                        <td className="prop-desc">{spec.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {/* TAB VIEW 4: COMPLIANCE CHECKLIST CHECKER */}
            {activeTab === 'Accessibility' && (
              <section className="a11y-section animated-fade-in">
                <ul className="a11y-list">
                  {currentDocs?.accessibility?.map((item: string, index: number) => (
                    <li key={index} className="a11y-item">
                      <span className="check-icon">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            
          </div>

          {/* STEPPER CONTROLS FOOTER */}
          <footer className="doc-footer-navigation">
            <button className="nav-btn prev" onClick={handlePrev} disabled={currentIndex === 0}>
              ← Prev Component
            </button>
            <button className="nav-btn next" onClick={handleNext} disabled={currentIndex === COMPONENT_LIST.length - 1}>
              Next Component →
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}