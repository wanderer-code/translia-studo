import React, { useState, useEffect, useMemo, useRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { create } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';
import { loadExternalScript } from './external-libraries.js';
import { findRepeatedPageNumberCandidates, isBinaryGarbageLine, detectIsListItem, cleanPersianDocxArtifacts, splitParagraphIntoListSegments, extractCleanParagraphsFromPDF, extractCleanParagraphsFromDocx } from './parsers.js';
import { LESSON_2_SEGMENTS, LESSON_3_SEGMENTS, INITIAL_SEGMENTS, INITIAL_GLOSSARY, INITIAL_COMMENTS } from './lesson-data.js';
export { LESSON_2_SEGMENTS, LESSON_3_SEGMENTS, extractCleanParagraphsFromPDF, extractCleanParagraphsFromDocx };
import { computeWordDiff, runSegmentQA } from './review-quality.js';
export { toPersianDigits, computeWordDiff, runSegmentQA } from './review-quality.js';
import DictionaryPanel from './DictionaryPanel.jsx';
import SuggestionsPanel from './SuggestionsPanel.jsx';
import TranslatorLauncher from './TranslatorLauncher.jsx';
import { captureTextSelection, updateMarksForEdit, useTextMarks } from './text-highlights.js';
import { splitSentences, matchSentence } from './sentences.js';
import {
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Search,
  Upload,
  Merge,
  Split,
  Undo2,
  Redo2,
  BookOpen,
  BookText,
  Lightbulb,
  Plus,
  Trash2,
  X,
  Edit3,
  Highlighter,
  ScanText,
  GitCompare,
  Eraser,
  Send,
  MoreVertical,
  ChevronDown,
  FolderOpen,
  Settings,
  HelpCircle,
  EyeOff,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  List,
  ShieldCheck,
  Wand2,
  GripVertical,
  Zap,
  Gauge,
  Filter,
} from 'lucide-react';

// ============================================================================
// 0. RUNTIME GSAP & AUTO-ANIMATE BRIDGES (Zero Bundler Dependency Errors)
// ============================================================================

if (typeof window !== 'undefined' && !window.gsap) {
  loadExternalScript(
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    'gsap'
  ).catch(() => {});
}

const gsap = {
  to(target, vars = {}) {
    if (!target) return { kill: () => {} };
    if (typeof window !== 'undefined' && window.gsap) {
      return window.gsap.to(target, vars);
    }
    if (vars.attr && target.setAttribute) {
      Object.entries(vars.attr).forEach(([k, v]) => target.setAttribute(k, String(v)));
    }
    if (vars.stroke && target.setAttribute) target.setAttribute('stroke', vars.stroke);
    if (vars.fill && target.setAttribute) target.setAttribute('fill', vars.fill);
    if (vars.opacity !== undefined && target.style) target.style.opacity = String(vars.opacity);
    if (vars.strokeDashoffset !== undefined && target.animate) {
      const anim = target.animate(
        [{ strokeDashoffset: '48px' }, { strokeDashoffset: `${vars.strokeDashoffset}px` }],
        {
          duration: (vars.duration || 1.2) * 1000,
          iterations: vars.repeat === -1 ? Infinity : 1,
          easing: 'linear',
        }
      );
      return { kill: () => anim.cancel() };
    }
    return { kill: () => {} };
  },
  set(target, vars = {}) {
    if (!target) return;
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.set(target, vars);
      return;
    }
    if (vars.opacity !== undefined && target.style) target.style.opacity = String(vars.opacity);
    if (vars.strokeDashoffset !== undefined && target.style) {
      target.style.strokeDashoffset = String(vars.strokeDashoffset);
    }
  },
  fromTo(target, fromVars = {}, toVars = {}) {
    if (!target) return { kill: () => {} };
    if (typeof window !== 'undefined' && window.gsap) {
      return window.gsap.fromTo(target, fromVars, toVars);
    }
    if (target.animate) {
      const anim = target.animate(
        [
          {
            opacity: fromVars.opacity ?? 1,
            strokeDashoffset: `${fromVars.strokeDashoffset ?? 56}px`,
            strokeWidth: `${fromVars.strokeWidth ?? 3.2}px`,
          },
          {
            opacity: toVars.opacity ?? 0,
            strokeDashoffset: `${toVars.strokeDashoffset ?? 0}px`,
            strokeWidth: `${toVars.strokeWidth ?? 2.2}px`,
          },
        ],
        {
          duration: (toVars.duration || 0.65) * 1000,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      return { kill: () => anim.cancel() };
    }
    return { kill: () => {} };
  },
};

function useAutoAnimate(options = { duration: 220 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const parent = elementRef.current;
    if (!parent || typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && typeof node.animate === 'function') {
            node.animate(
              [
                { opacity: 0, transform: 'translateY(-6px) scale(0.98)' },
                { opacity: 1, transform: 'translateY(0) scale(1)' },
              ],
              {
                duration: options.duration || 220,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }
            );
          }
        });
      });
    });

    observer.observe(parent, { childList: true });
    return () => observer.disconnect();
  }, [options.duration]);

  return [elementRef];
}

// ============================================================================
// 3. HELPERS: DIFFING, QA ANALYSIS & PERSIAN NUMERAL CONVERSION
// ============================================================================

function rebuildSegmentsFromColumns(enList, faObjects, prevSegments = []) {
  const maxLen = Math.max(enList.length, faObjects.length, 1);
  const next = [];
  for (let i = 0; i < maxLen; i++) {
    const existingRow = prevSegments[i];
    const enItem = enList[i] || { text: '', enId: `en-${Date.now()}-${i}` };
    const faItem = faObjects[i] || {
      faId: `fa-${Date.now()}-${i}`,
      rawPersian: '',
      editedPersian: '',
      status: 'unreviewed',
      lastModified: 'Just now',
    };
    const enText = typeof enItem === 'string' ? enItem : enItem.text;
    const enId = typeof enItem === 'string' ? existingRow?.enId || `en-${i + 1}` : enItem.enId;

    next.push({
      id: existingRow?.id || `seg-${Date.now()}-${i + 1}`,
      enId,
      faId: faItem.faId || existingRow?.faId || `fa-${i + 1}`,
      index: i + 1,
      sourcePage: typeof enItem === 'string' ? existingRow?.sourcePage ?? null : enItem.sourcePage ?? null,
      sourcePageVerified: typeof enItem === 'string' ? Boolean(existingRow?.sourcePageVerified) : Boolean(enItem.sourcePageVerified),
      english: enText !== undefined ? enText : '',
      enHighlights: typeof enItem === 'string' ? [] : (enItem.enHighlights || []),
      faHighlights: faItem.faHighlights || [],
      rawPersian: faItem.rawPersian !== undefined ? faItem.rawPersian : '',
      editedPersian: faItem.editedPersian !== undefined ? faItem.editedPersian : '',
      status: faItem.status || 'unreviewed',
      lastModified: faItem.lastModified || 'Just now',
    });
  }
  return next;
}

const englishBlock = (segment) => ({ text: segment.english, enId: segment.enId || `en-${segment.id}`, sourcePage: segment.sourcePage, sourcePageVerified: segment.sourcePageVerified, enHighlights: segment.enHighlights || [] });

// ============================================================================
// 4. CENTRALIZED ZUSTAND STORE
// ============================================================================

const STORAGE_KEY = 'translia_en_fa_studio_v11_full_lessons';

const loadSavedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.segments) && parsed.segments.length > 0) {
        const hasCorrupted = parsed.segments.some(
          (s) =>
            (s.english && isBinaryGarbageLine(s.english)) ||
            (s.editedPersian && isBinaryGarbageLine(s.editedPersian)) ||
            /^Source segment #\d+$/.test((s.english || '').trim())
        );
        if (!hasCorrupted) return parsed;
      }
    }
  } catch (e) {
    // ignore storage errors
  }
  return null;
};

const saved = loadSavedState();
let lastTyping = { key: '', time: 0 };
const historySnapshot = (state) => JSON.parse(JSON.stringify({
  segments: state.segments, sourceFileName: state.sourceFileName, targetFileName: state.targetFileName,
  comments: state.comments, glossary: state.glossary, dismissedWarnings: state.dismissedWarnings,
}));

const useTranslationStore = create((set, get) => ({
  activePresetLesson: saved?.activePresetLesson || 'lesson2',
  projectName: saved?.projectName || (saved?.activePresetLesson === 'lesson3' ? 'Lesson 3' : 'Lesson 2'),
  sourceFileName: saved?.sourceFileName || '02-1.pdf',
  targetFileName: saved?.targetFileName || 'Game_Theory_Lesson_2_Persian.docx',
  segments: saved?.segments || INITIAL_SEGMENTS,
  glossary: saved?.glossary || INITIAL_GLOSSARY,
  comments: saved?.comments || INITIAL_COMMENTS,
  projects: saved?.projects || {},
  deletedProjectIds: saved?.deletedProjectIds || [],
  saveError: null,
  sentenceHighlightEnabled: saved?.sentenceHighlightEnabled ?? false,
  selectedSentence: null,
  reviewFilter: 'all',
  dismissedWarnings: saved?.dismissedWarnings || {},

  activeSegmentId: 'seg-10',
  editingCommentSegId: null,
  showDiffInline: false,
  searchQuery: '',
  showSearchBar: false,
  autoSplitLists: true,

  enColumnRatio: saved?.enColumnRatio || 0.5,
  virtualizedMode: false,

  pulseTrigger: { segmentId: 'seg-10', timestamp: 0 },
  fireBezierPulse: (segmentId) =>
    set({ pulseTrigger: { segmentId: segmentId || get().activeSegmentId, timestamp: Date.now() } }),

  showCommentsPanel: saved?.showCommentsPanel !== undefined ? saved.showCommentsPanel : true,
  showGlossaryPanel: saved?.showGlossaryPanel !== undefined ? saved.showGlossaryPanel : true,
  commentsPanelWidth: 280,
  glossaryPanelWidth: 265,

  showUIInspectorModal: false,
  autoAlignCards: true,
  uiAuditReport: {
    passed: true,
    score: 100,
    checkedRows: INITIAL_SEGMENTS.length,
    misalignedRows: 0,
    maxDeltaY: 0,
    maxDeltaH: 0,
    listItemsCount: INITIAL_SEGMENTS.filter((s) => detectIsListItem(s.english)).length,
    overflowDetected: false,
    lastCheckedAt: 'Just now',
  },

  pastHistory: [],
  futureHistory: [],
  toastMessage: null,

  setToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      if (get().toastMessage === msg) set({ toastMessage: null });
    }, 3200);
  },

  persist: () => {
    const state = get();
    const project = {
      sourceFileName: state.sourceFileName, targetFileName: state.targetFileName,
      segments: state.segments, glossary: state.glossary, comments: state.comments,
      dismissedWarnings: state.dismissedWarnings, projectName: state.projectName,
    };
    const projects = { ...state.projects, [state.activePresetLesson]: project };
    set({ projects });
    try {
      const {
        activePresetLesson,
        sourceFileName,
        targetFileName,
        segments,
        glossary,
        comments,
        showCommentsPanel,
        showGlossaryPanel,
        enColumnRatio,
      } = get();
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activePresetLesson,
          sourceFileName,
          targetFileName,
          segments,
          glossary,
          comments,
          showCommentsPanel,
          showGlossaryPanel,
          enColumnRatio,
          projects,
          deletedProjectIds: state.deletedProjectIds,
          dismissedWarnings: state.dismissedWarnings,
          sentenceHighlightEnabled: state.sentenceHighlightEnabled,
          projectName: state.projectName,
        })
      );
      set({ saveError: null });
    } catch (e) {
      set({ saveError: 'Could not save in browser storage. Download a project backup.' });
    }
  },

  loadPresetLesson: (lessonKey) => {
    if (lessonKey === get().activePresetLesson) return;
    get().persist();
    const isLesson3 = lessonKey === 'lesson3';
    const project = get().projects[lessonKey] || {
      sourceFileName: isLesson3 ? '03.pdf' : '02-1.pdf',
      targetFileName: isLesson3 ? 'Game_Theory_Lesson_3_Persian.docx' : 'Game_Theory_Lesson_2_Persian.docx',
      segments: isLesson3 ? LESSON_3_SEGMENTS : LESSON_2_SEGMENTS,
      glossary: INITIAL_GLOSSARY, comments: isLesson3 ? [] : INITIAL_COMMENTS, dismissedWarnings: {}, projectName: isLesson3 ? 'Lesson 3' : 'Lesson 2',
    };
    set({ ...project, projectName: project.projectName || (isLesson3 ? 'Lesson 3' : 'Lesson 2'), dismissedWarnings: project.dismissedWarnings || {}, activePresetLesson: lessonKey, activeSegmentId: project.segments[0]?.id,
      pastHistory: [], futureHistory: [], selectedSentence: null });
    get().persist();
    get().setToast(`Opened ${project.projectName || (isLesson3 ? 'Lesson 3' : 'Lesson 2')} (${project.segments.length} blocks)`);
  },

  createProject: (name) => {
    get().persist();
    const id = `project-${Date.now()}`;
    const segment = { id: `seg-${Date.now()}`, enId: `en-${Date.now()}`, faId: `fa-${Date.now()}`, index: 1, sourcePage: null, english: '', rawPersian: '', editedPersian: '', status: 'unreviewed', lastModified: 'Just now' };
    set({ activePresetLesson: id, projectName: name, sourceFileName: 'Choose English file', targetFileName: 'Choose Persian file', segments: [segment], glossary: [], comments: [], dismissedWarnings: {}, activeSegmentId: segment.id, selectedSentence: null, pastHistory: [], futureHistory: [] });
    get().persist();
  },

  deleteCurrentProject: () => {
    const state = get();
    const deletedId = state.activePresetLesson;
    const projects = { ...state.projects };
    delete projects[deletedId];
    const deletedProjectIds = [...new Set([...state.deletedProjectIds, deletedId])];
    const nextId = [...Object.keys(projects), 'lesson2', 'lesson3'].find((id) => !deletedProjectIds.includes(id));
    if (nextId) {
      const isLesson3 = nextId === 'lesson3';
      const project = projects[nextId] || { sourceFileName: isLesson3 ? '03.pdf' : '02-1.pdf', targetFileName: isLesson3 ? 'Game_Theory_Lesson_3_Persian.docx' : 'Game_Theory_Lesson_2_Persian.docx', segments: isLesson3 ? LESSON_3_SEGMENTS : LESSON_2_SEGMENTS, glossary: INITIAL_GLOSSARY, comments: isLesson3 ? [] : INITIAL_COMMENTS, dismissedWarnings: {}, projectName: isLesson3 ? 'Lesson 3' : 'Lesson 2' };
      set({ projects, deletedProjectIds, ...project, activePresetLesson: nextId, activeSegmentId: project.segments[0]?.id, pastHistory: [], futureHistory: [], selectedSentence: null, searchQuery: '', reviewFilter: 'all' });
    } else {
      const id = `project-${Date.now()}`;
      const segment = { id: `seg-${Date.now()}`, enId: `en-${Date.now()}`, faId: `fa-${Date.now()}`, index: 1, sourcePage: null, english: '', rawPersian: '', editedPersian: '', status: 'unreviewed', lastModified: 'Just now' };
      set({ projects, deletedProjectIds, activePresetLesson: id, projectName: 'Untitled project', sourceFileName: 'Choose English file', targetFileName: 'Choose Persian file', segments: [segment], glossary: [], comments: [], dismissedWarnings: {}, activeSegmentId: segment.id, pastHistory: [], futureHistory: [], selectedSentence: null, searchQuery: '', reviewFilter: 'all' });
    }
    get().persist();
    get().setToast('Project removed');
  },

  toggleSentenceHighlight: () => {
    set((s) => ({ sentenceHighlightEnabled: !s.sentenceHighlightEnabled, selectedSentence: null }));
    get().persist();
  },
  selectSentence: (segmentId, index) => set({ selectedSentence: { segmentId, index } }),
  markSelectedText: (id, side, mark) => {
    const field = side === 'en' ? 'enHighlights' : 'faHighlights';
    const segment = get().segments.find((item) => item.id === id);
    const text = side === 'en' ? segment?.english : segment?.editedPersian;
    if (!mark || !text || text.slice(mark.start, mark.end) !== mark.text) { get().setToast('Select text in this block first.'); return; }
    get().pushHistory();
    set((state) => ({ segments: state.segments.map((item) => item.id === id ? { ...item, [field]: [...(item[field] || []).filter((m) => m.start !== mark.start || m.end !== mark.end), mark] } : item) }));
    get().persist();
  },
  clearTextMarks: (id, side) => {
    const field = side === 'en' ? 'enHighlights' : 'faHighlights';
    get().pushHistory();
    set((state) => ({ segments: state.segments.map((item) => item.id === id ? { ...item, [field]: [] } : item) }));
    get().persist();
  },
  setReviewFilter: (reviewFilter) => set({ reviewFilter }),
  dismissWarning: (id, reason) => {
    get().pushHistory();
    set((s) => ({ dismissedWarnings: { ...s.dismissedWarnings, [id]: reason } }));
    get().persist();
  },
  restoreWarnings: () => { get().pushHistory(); set({ dismissedWarnings: {} }); get().persist(); },

  pushHistory: () => {
    lastTyping = { key: '', time: 0 };
    const { pastHistory } = get();
    const snapshot = historySnapshot(get());
    set({
      pastHistory: [...pastHistory.slice(-19), snapshot],
      futureHistory: [],
    });
  },

  undo: () => {
    const { pastHistory, futureHistory } = get();
    if (pastHistory.length === 0) return;
    const previous = pastHistory[pastHistory.length - 1];
    const currentSnapshot = historySnapshot(get());
    set({
      ...previous,
      pastHistory: pastHistory.slice(0, -1),
      futureHistory: [currentSnapshot, ...futureHistory],
    });
    get().persist();
    get().setToast('Undid last paragraph change');
  },

  redo: () => {
    const { futureHistory, pastHistory } = get();
    if (futureHistory.length === 0) return;
    const next = futureHistory[0];
    const currentSnapshot = historySnapshot(get());
    set({
      ...next,
      futureHistory: futureHistory.slice(1),
      pastHistory: [...pastHistory, currentSnapshot],
    });
    get().persist();
    get().setToast('Redid paragraph change');
  },

  setActiveSegment: (id) => set({ activeSegmentId: id }),
  navigateToSegment: (id, preserveFilters = false) => {
    set({ activeSegmentId: id, ...(preserveFilters ? {} : { searchQuery: '', reviewFilter: 'all' }), virtualizedMode: false });
    setTimeout(() => document.querySelector(`[data-segment-id="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  },
  setEditingCommentSegId: (id) => set({ editingCommentSegId: id }),
  toggleDiffInline: () => set((s) => ({ showDiffInline: !s.showDiffInline })),
  toggleSearchBar: () => set((s) => ({ showSearchBar: !s.showSearchBar })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleVirtualizedMode: () =>
    set((s) => {
      const next = !s.virtualizedMode;
      get().setToast(
        next ? '60fps Virtualized Windowing enabled' : 'Full DOM Rendering enabled'
      );
      return { virtualizedMode: next };
    }),
  setEnColumnRatio: (ratio) => {
    const clamped = Math.max(0.28, Math.min(0.72, ratio));
    set({ enColumnRatio: clamped });
  },
  toggleAutoSplitLists: () =>
    set((s) => {
      const next = !s.autoSplitLists;
      get().setToast(next ? 'List item auto-detection enabled' : 'List item auto-splitting paused');
      return { autoSplitLists: next };
    }),

  normalizeAndUnmixAllSegments: () => {
    const { segments } = get();
    get().pushHistory();

    const newEnList = [];
    const newFaObjects = [];

    segments.forEach((seg, idx) => {
      const enSplit = splitParagraphIntoListSegments(seg.english, false);
      const faSplit = splitParagraphIntoListSegments(
        cleanPersianDocxArtifacts(seg.editedPersian),
        true
      );
      const rawFaSplit = splitParagraphIntoListSegments(
        cleanPersianDocxArtifacts(seg.rawPersian),
        true
      );

      enSplit.forEach((t, subIdx) => {
        newEnList.push({
          text: t,
          enId: subIdx === 0 ? seg.enId || `en-${idx}` : `en-${Date.now()}-${idx}-${subIdx}`,
          sourcePage: seg.sourcePage,
          sourcePageVerified: seg.sourcePageVerified,
        });
      });
      faSplit.forEach((faChunk, fIdx) => {
        newFaObjects.push({
          faId: fIdx === 0 ? seg.faId || `fa-${idx}` : `fa-${Date.now()}-${idx}-${fIdx}`,
          rawPersian: rawFaSplit[fIdx] || faChunk,
          editedPersian: faChunk,
          status: seg.status,
          lastModified: 'Normalized',
        });
      });
    });

    const rebuilt = rebuildSegmentsFromColumns(newEnList, newFaObjects, segments).filter(
      (s) => s.english.trim() !== '' || s.editedPersian.trim() !== ''
    );
    set({ segments: rebuilt });
    get().persist();
    get().setToast(`Normalized & aligned ${rebuilt.length} blocks`);
  },

  toggleCommentsPanel: () =>
    set((s) => {
      const next = !s.showCommentsPanel;
      setTimeout(() => get().persist(), 0);
      return { showCommentsPanel: next };
    }),

  toggleGlossaryPanel: () =>
    set((s) => {
      const next = !s.showGlossaryPanel;
      setTimeout(() => get().persist(), 0);
      return { showGlossaryPanel: next };
    }),

  setPanelWidth: (panel, width) => {
    if (panel === 'comments') {
      set({ commentsPanelWidth: Math.max(220, Math.min(420, width)) });
    } else if (panel === 'glossary') {
      set({ glossaryPanelWidth: Math.max(220, Math.min(400, width)) });
    }
  },

  toggleUIInspectorModal: () => set((s) => ({ showUIInspectorModal: !s.showUIInspectorModal })),
  toggleAutoAlignCards: () => set((s) => ({ autoAlignCards: !s.autoAlignCards })),
  setUIAuditReport: (report) => set({ uiAuditReport: report }),

  updatePersianText: (id, newText) => {
    const now = Date.now();
    if (lastTyping.key !== `fa:${id}` || now - lastTyping.time > 900) get().pushHistory();
    lastTyping = { key: `fa:${id}`, time: now };
    set((state) => ({
      segments: state.segments.map((seg) => {
        if (seg.id !== id) return seg;
        return {
          ...seg,
          editedPersian: newText,
          faHighlights: updateMarksForEdit(seg.faHighlights, seg.editedPersian, newText),
          status: newText !== seg.editedPersian ? 'edited' : seg.status,
          lastModified: 'Just now',
        };
      }),
    }));
    get().fireBezierPulse(id);
    get().persist();
  },

  updateEnglishText: (id, newEnglish) => {
    const now = Date.now();
    if (lastTyping.key !== `en:${id}` || now - lastTyping.time > 900) get().pushHistory();
    lastTyping = { key: `en:${id}`, time: now };
    set((state) => ({
      segments: state.segments.map((seg) =>
        seg.id === id ? { ...seg, english: newEnglish, enHighlights: updateMarksForEdit(seg.enHighlights, seg.english, newEnglish), status: newEnglish !== seg.english ? 'edited' : seg.status, lastModified: 'Just now' } : seg
      ),
    }));
    get().fireBezierPulse(id);
    get().persist();
  },

  splitSegmentIntoListItems: (index) => {
    const { segments } = get();
    const target = segments[index];
    if (!target) return;

    const enParts = splitParagraphIntoListSegments(target.english, false);
    const faParts = splitParagraphIntoListSegments(target.editedPersian, true);

    if (enParts.length <= 1 && faParts.length <= 1) {
      const enSentences = target.english
        .split(/(?<=[.;?!:])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      const faSentences = target.editedPersian
        .split(/(?<=[.؛؟!:])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      if (enSentences.length <= 1 && faSentences.length <= 1) {
        get().setToast('Paragraph is already a single concise item');
        return;
      }

      get().pushHistory();
      const maxCount = Math.max(enSentences.length, faSentences.length);
      const newRows = [];
      for (let k = 0; k < maxCount; k++) {
        newRows.push({
          id: `seg-${Date.now()}-${k}`,
          enId: `en-${Date.now()}-${k}`,
          faId: `fa-${Date.now()}-${k}`,
          index: index + 1 + k,
          sourcePage: target.sourcePage,
          sourcePageVerified: target.sourcePageVerified,
          english: enSentences[k] || '',
          rawPersian: faSentences[k] || '',
          editedPersian: faSentences[k] || '',
          status: 'edited',
          lastModified: 'Just now',
        });
      }
      const updated = [
        ...segments.slice(0, index),
        ...newRows,
        ...segments.slice(index + 1),
      ].map((s, i) => ({ ...s, index: i + 1 }));
      set({ segments: updated, activeSegmentId: newRows[0].id });
      get().persist();
      get().setToast(`Split into ${newRows.length} separate blocks`);
      return;
    }

    get().pushHistory();
    const maxCount = Math.max(enParts.length, faParts.length);
    const newRows = [];
    for (let k = 0; k < maxCount; k++) {
      newRows.push({
        id: `seg-${Date.now()}-${k}`,
        enId: `en-${Date.now()}-${k}`,
        faId: `fa-${Date.now()}-${k}`,
        index: index + 1 + k,
        sourcePage: target.sourcePage,
        sourcePageVerified: target.sourcePageVerified,
        english: enParts[k] || '',
        rawPersian: faParts[k] || '',
        editedPersian: faParts[k] || '',
        status: 'edited',
        lastModified: 'Just now',
      });
    }
    const updated = [
      ...segments.slice(0, index),
      ...newRows,
      ...segments.slice(index + 1),
    ].map((s, i) => ({ ...s, index: i + 1 }));
    set({ segments: updated, activeSegmentId: newRows[0].id });
    get().persist();
    get().setToast(`Unmixed into ${newRows.length} aligned blocks`);
  },

  removeEnglishBlock: (index) => {
    const { segments } = get();
    if (segments.length <= 1 && !segments[0].editedPersian) {
      get().setToast('Cannot remove the only remaining block');
      return;
    }
    get().pushHistory();
    const enList = segments.map(englishBlock);
    const faObjects = segments.map((s) => ({
      faId: s.faId || `fa-${s.id}`,
      rawPersian: s.rawPersian,
      editedPersian: s.editedPersian,
      faHighlights: s.faHighlights || [],
      status: s.status,
      lastModified: s.lastModified,
    }));
    enList.splice(index, 1);
    const rebuilt = rebuildSegmentsFromColumns(enList, faObjects, segments).filter(
      (s) => s.english.trim() !== '' || s.editedPersian.trim() !== ''
    );
    const finalSegments = (rebuilt.length > 0 ? rebuilt : [INITIAL_SEGMENTS[0]]).map((s, idx) => ({
      ...s,
      index: idx + 1,
    }));
    set({ segments: finalSegments });
    get().persist();
    get().setToast(`Removed English block #${index + 1} (subsequent English blocks glided up)`);
  },

  insertEnglishBlockAt: (index, position = 'after') => {
    const { segments } = get();
    get().pushHistory();
    const targetIdx = position === 'before' ? index : index + 1;
    const enList = segments.map(englishBlock);
    const faObjects = segments.map((s) => ({
      faId: s.faId || `fa-${s.id}`,
      rawPersian: s.rawPersian,
      editedPersian: s.editedPersian,
      faHighlights: s.faHighlights || [],
      status: s.status,
      lastModified: s.lastModified,
    }));
    enList.splice(targetIdx, 0, {
      text: 'New English paragraph...',
      enId: `en-${Date.now()}`,
    });
    const rebuilt = rebuildSegmentsFromColumns(enList, faObjects, segments);
    set({
      segments: rebuilt,
      activeSegmentId: rebuilt[Math.min(targetIdx, rebuilt.length - 1)]?.id,
    });
    get().persist();
    get().setToast(`Inserted new English block at #${targetIdx + 1}`);
  },

  moveEnglishBlock: (index, direction) => {
    const { segments } = get();
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= segments.length) return;
    get().pushHistory();
    const enList = segments.map(englishBlock);
    const faObjects = segments.map((s) => ({
      faId: s.faId || `fa-${s.id}`,
      rawPersian: s.rawPersian,
      editedPersian: s.editedPersian,
      faHighlights: s.faHighlights || [],
      status: s.status,
      lastModified: s.lastModified,
    }));
    const temp = enList[index];
    enList[index] = enList[targetIdx];
    enList[targetIdx] = temp;
    const rebuilt = rebuildSegmentsFromColumns(enList, faObjects, segments);
    set({ segments: rebuilt });
    get().persist();
    get().setToast(`Moved English block #${index + 1} ${direction}`);
  },

  removePersianBlock: (index) => {
    const { segments } = get();
    if (segments.length <= 1 && !segments[0].english) {
      get().setToast('Cannot remove the only remaining block');
      return;
    }
    get().pushHistory();
    const enList = segments.map(englishBlock);
    const faObjects = segments.map((s) => ({
      faId: s.faId || `fa-${s.id}`,
      rawPersian: s.rawPersian,
      editedPersian: s.editedPersian,
      faHighlights: s.faHighlights || [],
      status: s.status,
      lastModified: s.lastModified,
    }));
    faObjects.splice(index, 1);
    const rebuilt = rebuildSegmentsFromColumns(enList, faObjects, segments).filter(
      (s) => s.english.trim() !== '' || s.editedPersian.trim() !== ''
    );
    const finalSegments = (rebuilt.length > 0 ? rebuilt : [INITIAL_SEGMENTS[0]]).map((s, idx) => ({
      ...s,
      index: idx + 1,
    }));
    set({ segments: finalSegments });
    get().persist();
    get().setToast(`Removed Persian block #${index + 1} (subsequent Persian blocks glided up)`);
  },

  insertPersianBlockAt: (index, position = 'after') => {
    const { segments } = get();
    get().pushHistory();
    const targetIdx = position === 'before' ? index : index + 1;
    const enList = segments.map(englishBlock);
    const faObjects = segments.map((s) => ({
      faId: s.faId || `fa-${s.id}`,
      rawPersian: s.rawPersian,
      editedPersian: s.editedPersian,
      faHighlights: s.faHighlights || [],
      status: s.status,
      lastModified: s.lastModified,
    }));
    faObjects.splice(targetIdx, 0, {
      faId: `fa-${Date.now()}`,
      rawPersian: '',
      editedPersian: 'پاراگراف جدید...',
      status: 'edited',
      lastModified: 'Just now',
    });
    const rebuilt = rebuildSegmentsFromColumns(enList, faObjects, segments);
    set({
      segments: rebuilt,
      activeSegmentId: rebuilt[Math.min(targetIdx, rebuilt.length - 1)]?.id,
    });
    get().persist();
    get().setToast(`Inserted new Persian block at #${targetIdx + 1}`);
  },

  movePersianBlock: (index, direction) => {
    const { segments } = get();
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= segments.length) return;
    get().pushHistory();
    const enList = segments.map(englishBlock);
    const faObjects = segments.map((s) => ({
      faId: s.faId || `fa-${s.id}`,
      rawPersian: s.rawPersian,
      editedPersian: s.editedPersian,
      faHighlights: s.faHighlights || [],
      status: s.status,
      lastModified: s.lastModified,
    }));
    const temp = faObjects[index];
    faObjects[index] = faObjects[targetIdx];
    faObjects[targetIdx] = temp;
    const rebuilt = rebuildSegmentsFromColumns(enList, faObjects, segments);
    set({ segments: rebuilt });
    get().persist();
    get().setToast(`Moved Persian block #${index + 1} ${direction}`);
  },

  insertRowAt: (index, position = 'after') => {
    const { segments } = get();
    get().pushHistory();
    const targetIdx = position === 'before' ? index : index + 1;
    const now = Date.now();
    const newId = `seg-${now}`;
    const newRow = {
      id: newId,
      enId: `en-${now}`,
      faId: `fa-${now}`,
      index: targetIdx + 1,
      sourcePage: segments[index]?.sourcePage || 1,
      english: 'New English segment...',
      rawPersian: '',
      editedPersian: 'پاراگراف فارسی جدید...',
      status: 'unreviewed',
      lastModified: 'Just now',
    };
    const updated = [
      ...segments.slice(0, targetIdx),
      newRow,
      ...segments.slice(targetIdx),
    ].map((s, idx) => ({ ...s, index: idx + 1 }));
    set({ segments: updated, activeSegmentId: newId });
    get().persist();
    get().setToast(`Added new bilingual row #${targetIdx + 1}`);
  },

  removeRowAt: (index) => {
    const { segments } = get();
    if (segments.length <= 1) {
      get().setToast('At least one row must remain');
      return;
    }
    get().pushHistory();
    const updated = segments
      .filter((_, idx) => idx !== index)
      .map((s, idx) => ({ ...s, index: idx + 1 }));
    set({
      segments: updated,
      activeSegmentId: updated[Math.min(index, updated.length - 1)]?.id,
    });
    get().persist();
    get().setToast(`Deleted bilingual row #${index + 1}`);
  },

  cycleSegmentStatus: (id) => {
    get().pushHistory();
    const order = ['unreviewed', 'edited', 'needs_check', 'approved'];
    set((state) => ({
      segments: state.segments.map((seg) => {
        if (seg.id !== id) return seg;
        const nextStatus = order[(order.indexOf(seg.status) + 1) % order.length];
        return { ...seg, status: nextStatus, lastModified: 'Just now' };
      }),
    }));
    get().fireBezierPulse(id);
    get().persist();
  },

  setSegmentStatus: (id, status) => {
    get().pushHistory();
    set((state) => ({
      segments: state.segments.map((seg) =>
        seg.id === id ? { ...seg, status, lastModified: 'Just now' } : seg
      ),
    }));
    get().fireBezierPulse(id);
    get().persist();
  },

  mergeWithNext: (id) => {
    const { segments } = get();
    const idx = segments.findIndex((s) => s.id === id);
    if (idx === -1 || idx >= segments.length - 1) {
      get().setToast('Select a non-final paragraph to merge downward');
      return;
    }
    get().pushHistory();
    const curr = segments[idx];
    const next = segments[idx + 1];
    const merged = {
      ...curr,
      english: `${curr.english} ${next.english}`.trim(),
      rawPersian: `${curr.rawPersian} ${next.rawPersian}`.trim(),
      editedPersian: `${curr.editedPersian} ${next.editedPersian}`.trim(),
      status: 'edited',
      lastModified: 'Merged',
    };
    const updated = [
      ...segments.slice(0, idx),
      merged,
      ...segments.slice(idx + 2),
    ].map((s, i) => ({ ...s, index: i + 1 }));
    set({ segments: updated, activeSegmentId: merged.id });
    get().persist();
    get().setToast(`Merged Segment #${idx + 1} & #${idx + 2}`);
  },

  splitSegment: (id) => {
    const { segments } = get();
    const idx = segments.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const seg = segments[idx];

    const enSmart = splitParagraphIntoListSegments(seg.english, false);
    if (enSmart.length > 1) {
      get().splitSegmentIntoListItems(idx);
      return;
    }

    const enWords = seg.english.trim().split(/\s+/);
    const faWords = seg.editedPersian.trim().split(/\s+/);
    if (enWords.length < 4 && faWords.length < 4) {
      get().setToast('Segment is too short to split');
      return;
    }
    get().pushHistory();
    const enMid = Math.ceil(enWords.length / 2);
    const faMid = Math.ceil(faWords.length / 2);
    const now = Date.now();
    const first = {
      ...seg,
      english: enWords.slice(0, enMid).join(' '),
      rawPersian: faWords.slice(0, faMid).join(' '),
      editedPersian: faWords.slice(0, faMid).join(' '),
      status: 'edited',
    };
    const second = {
      ...seg,
      id: `seg-${now}`,
      enId: `en-${now}`,
      faId: `fa-${now}`,
      english: enWords.slice(enMid).join(' '),
      rawPersian: faWords.slice(faMid).join(' '),
      editedPersian: faWords.slice(faMid).join(' '),
      status: 'needs_check',
    };
    const updated = [
      ...segments.slice(0, idx),
      first,
      second,
      ...segments.slice(idx + 1),
    ].map((s, i) => ({ ...s, index: i + 1 }));
    set({ segments: updated });
    get().persist();
    get().setToast(`Split Segment #${idx + 1} into two aligned rows`);
  },

  addComment: (segmentId, text) => {
    if (!text.trim()) return;
    get().pushHistory();
    const newComment = {
      id: `c-${Date.now()}`,
      segmentId,
      author: 'MJ',
      authorFull: 'Reviewer',
      avatarBg: '#345e54',
      text: text.trim(),
      timestamp: 'Just now',
      statusTag: 'Edited',
      replies: [],
    };
    set((state) => ({
      comments: [newComment, ...state.comments],
      editingCommentSegId: null,
    }));
    get().persist();
    get().setToast('Added revision comment');
  },

  addReplyToComment: (commentId, replyText) => {
    if (!replyText.trim()) return;
    get().pushHistory();
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...(c.replies || []),
                { id: `r-${Date.now()}`, author: 'MJ', text: replyText.trim(), timestamp: 'Just now' },
              ],
            }
          : c
      ),
    }));
    get().persist();
  },

  deleteComment: (commentId) => {
    get().pushHistory();
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== commentId),
    }));
    get().persist();
    get().setToast('Comment deleted');
  },

  addGlossaryTerm: (en, fa) => {
    if (!en.trim() || !fa.trim()) return;
    get().pushHistory();
    set((state) => ({
      glossary: [...state.glossary, { id: `g-${Date.now()}`, en: en.trim(), fa: fa.trim() }],
    }));
    get().persist();
    get().setToast(`Added "${en}" → "${fa}" to Glossary`);
  },

  deleteGlossaryTerm: (id) => {
    get().pushHistory();
    set((state) => ({
      glossary: state.glossary.filter((g) => g.id !== id),
    }));
    get().persist();
  },

  insertGlossaryIntoActive: (faTerm) => {
    const { activeSegmentId, segments } = get();
    const target = segments.find((s) => s.id === activeSegmentId) || segments[0];
    if (!target) return;
    get().pushHistory();
    const updatedText = `${target.editedPersian.trim()} ${faTerm}`.trim();
    get().updatePersianText(target.id, updatedText);
    get().fireBezierPulse(target.id);
    get().setToast(`Inserted "${faTerm}" into Segment #${target.index}`);
  },

  uploadFileContent: (type, fileName, extractedParagraphs) => {
    const cleanEntries = (extractedParagraphs || [])
      .map((p, index) => ({ text: type === 'target' ? cleanPersianDocxArtifacts(p) : p.trim(), sourcePage: extractedParagraphs.sourcePages?.[index] ?? null }))
      .filter((p) => p.text.length > 0 && !isBinaryGarbageLine(p.text));
    const cleanParagraphs = cleanEntries.map((p) => p.text);

    if (cleanParagraphs.length === 0) {
      get().setToast(`Could not extract readable text from ${fileName}.`);
      return;
    }

    get().pushHistory();
    const current = get().segments;
    const otherSideCount = current.filter((s) =>
      type === 'source' ? s.editedPersian.trim().length > 0 : s.english.trim().length > 0
    ).length;
    const maxLen = Math.max(current.length, cleanParagraphs.length);
    const nextSegments = [];
    const now = Date.now();

    for (let i = 0; i < maxLen; i++) {
      const existing = current[i];
      const incoming = cleanParagraphs[i];
      nextSegments.push({
        id: existing?.id || `seg-${now}-${i + 1}`,
        enId: type === 'source' ? `en-${now}-${i + 1}` : existing?.enId || `en-${now}-${i + 1}`,
        faId: type === 'target' ? `fa-${now}-${i + 1}` : existing?.faId || `fa-${now}-${i + 1}`,
        index: i + 1,
        sourcePage: type === 'source' ? cleanEntries[i]?.sourcePage ?? null : existing?.sourcePage ?? null,
        sourcePageVerified: type === 'source' ? cleanEntries[i]?.sourcePage != null : Boolean(existing?.sourcePageVerified),
        english:
          type === 'source'
            ? incoming !== undefined
              ? incoming
              : ''
            : existing?.english || '',
        rawPersian:
          type === 'target'
            ? incoming !== undefined
              ? incoming
              : ''
            : existing?.rawPersian || '',
        editedPersian:
          type === 'target'
            ? incoming !== undefined
              ? incoming
              : ''
            : existing?.editedPersian || '',
        status: 'unreviewed',
        lastModified: 'Uploaded',
      });
    }

    const trimmedSegments = nextSegments.filter(
      (s) => s.english.trim() !== '' || s.editedPersian.trim() !== ''
    );

    set({
      segments: trimmedSegments,
      ...(type === 'source' ? { sourceFileName: fileName } : { targetFileName: fileName }),
    });
    get().persist();
    const listDetectedCount = cleanParagraphs.filter((p) => detectIsListItem(p)).length;
    get().setToast(
      `Loaded ${cleanParagraphs.length} blocks (${listDetectedCount} list items) from ${fileName}`
    );
  },

  resetSampleData: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      activePresetLesson: 'lesson2',
      sourceFileName: '02-1.pdf',
      targetFileName: 'Game_Theory_Lesson_2_Persian.docx',
      segments: INITIAL_SEGMENTS,
      glossary: INITIAL_GLOSSARY,
      comments: INITIAL_COMMENTS,
      activeSegmentId: 'seg-10',
      enColumnRatio: 0.5,
    });
    get().setToast('Restored complete 37-segment aligned Lesson 2 dataset');
  },
}));

// ============================================================================
// 5. LIVE SELF-HEALING VISUAL UI & ALIGNMENT INSPECTOR MODAL
// ============================================================================

function UIInspectorModal() {
  const {
    showUIInspectorModal,
    toggleUIInspectorModal,
    uiAuditReport,
    autoAlignCards,
    toggleAutoAlignCards,
    autoSplitLists,
    toggleAutoSplitLists,
    normalizeAndUnmixAllSegments,
  } = useTranslationStore();

  if (!showUIInspectorModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={toggleUIInspectorModal}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-xl bg-[#1b2028] border border-[#323a48] shadow-2xl overflow-hidden text-[#d5dce6]"
        >
          <div className="px-5 py-3.5 bg-[#161a22] border-b border-[#2c3340] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#1f332c] border border-[#366954] flex items-center justify-center text-[#58c496]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-[#e2e8f0]">
                  Live Visual UI & Alignment Inspector
                </h3>
                <p className="text-[11px] text-[#8b95a5]">
                  Motion Layout Springs • GSAP SVG Bezier • Auto-Animate • Resizable Columns
                </p>
              </div>
            </div>
            <button
              onClick={toggleUIInspectorModal}
              className="p-1 rounded-md text-[#8b95a5] hover:text-white hover:bg-[#222832]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-4 text-[12px]">
            <div className="p-3.5 rounded-lg bg-[#1f332c]/80 border border-[#366954] flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#6cd4a6] font-semibold">
                  Visual Audit Status
                </div>
                <div className="text-[14px] font-bold text-[#e6f4ee] mt-0.5">
                  {uiAuditReport.score}% Pixel-Aligned • Zero Row Drift
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#28473c] border border-[#428068] text-[#7be0b3] font-semibold text-[11px]">
                PASS ({uiAuditReport.checkedRows} rows)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg bg-[#222832] border border-[#2c3340]">
                <div className="text-[10.5px] text-[#8b95a5]">Top Y Parity (ΔY)</div>
                <div className="text-[14px] font-semibold text-[#d5dce6] mt-0.5">
                  {uiAuditReport.maxDeltaY}px
                </div>
                <div className="text-[10px] text-[#58c496] mt-0.5">Target: 0px</div>
              </div>
              <div className="p-3 rounded-lg bg-[#222832] border border-[#2c3340]">
                <div className="text-[10.5px] text-[#8b95a5]">Height Sync (ΔH)</div>
                <div className="text-[14px] font-semibold text-[#d5dce6] mt-0.5">
                  {uiAuditReport.maxDeltaH}px
                </div>
                <div className="text-[10px] text-[#58c496] mt-0.5">Equalized via Grid</div>
              </div>
              <div className="p-3 rounded-lg bg-[#222832] border border-[#2c3340]">
                <div className="text-[10.5px] text-[#8b95a5]">Detected Lists</div>
                <div className="text-[14px] font-semibold text-[#7cb7f0] mt-0.5">
                  {uiAuditReport.listItemsCount} items
                </div>
                <div className="text-[10px] text-[#8b95a5] mt-0.5">Unmixed from Body</div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#222832] border border-[#2c3340] cursor-pointer">
                <div>
                  <div className="text-[12px] font-medium text-[#d5dce6]">
                    Auto-Equalize Paired English & Persian Card Heights
                  </div>
                  <div className="text-[10.5px] text-[#8b95a5]">
                    Continuously locks left/right card bounding boxes so GSAP Bezier curves stay centered
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoAlignCards}
                  onChange={toggleAutoAlignCards}
                  className="accent-[#4b83b8] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#222832] border border-[#2c3340] cursor-pointer">
                <div>
                  <div className="text-[12px] font-medium text-[#d5dce6]">
                    PDF & Word List Auto-Splitting (Bullets & Indents)
                  </div>
                  <div className="text-[10.5px] text-[#8b95a5]">
                    Keeps multi-sentence Word bullets intact while detaching body paragraphs
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoSplitLists}
                  onChange={toggleAutoSplitLists}
                  className="accent-[#4b83b8] w-4 h-4"
                />
              </label>

              <button
                onClick={() => {
                  normalizeAndUnmixAllSegments();
                  toggleUIInspectorModal();
                }}
                className="w-full py-2 rounded-lg bg-[#26303d] hover:bg-[#2f3c4d] border border-[#4b83b8]/60 text-[#97c4f0] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Wand2 className="w-3.5 h-3.5" />
                Run Smart Paragraph & List Unmixer Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// 6. LEFT SLIM ACTIVITY RAIL & DECLUTTERED TOP HEADERS
// ============================================================================

const REVIEW_STATUS_OPTIONS = [
  { value: 'unreviewed', label: 'Unreviewed' }, { value: 'edited', label: 'In progress' },
  { value: 'needs_check', label: 'Needs attention' }, { value: 'approved', label: 'Approved' },
];
const SEGMENT_FILTER_OPTIONS = [
  { value: 'all', label: 'All segments' }, { value: 'unmatched', label: 'Unmatched blocks' },
  ...REVIEW_STATUS_OPTIONS, { value: 'warnings', label: 'QA warnings' },
];

function GlassSelect({ id, label, value, options, onChange, disabled, className = '', status }) {
  const listId = useId();
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const open = () => {
    if (disabled) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const desiredHeight = Math.min(options.length * 38 + 12, 280);
    const availableBelow = window.innerHeight - rect.bottom - 8;
    const above = availableBelow < Math.min(desiredHeight, 160) && rect.top > availableBelow;
    const height = Math.max(60, Math.min(desiredHeight, above ? rect.top - 8 : availableBelow));
    setActiveIndex(selectedIndex);
    setPosition({ left: Math.max(8, Math.min(rect.left, window.innerWidth - Math.max(rect.width, 180) - 8)), top: above ? rect.top - height - 5 : rect.bottom + 5, width: Math.max(rect.width, 180), maxHeight: height });
  };
  const close = () => setPosition(null);
  useEffect(() => {
    if (!position) return;
    const outside = (event) => { if (!triggerRef.current?.contains(event.target) && !listRef.current?.contains(event.target)) close(); };
    const onScroll = (event) => { if (!listRef.current?.contains(event.target)) close(); };
    document.addEventListener('pointerdown', outside);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', close);
    return () => { document.removeEventListener('pointerdown', outside); window.removeEventListener('scroll', onScroll, true); window.removeEventListener('resize', close); };
  }, [position]);
  useEffect(() => { if (position) document.getElementById(`${listId}-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest' }); }, [activeIndex, position, listId]);
  const choose = (index) => { const option = options[index]; if (option && !option.disabled) { onChange(option.value); close(); triggerRef.current?.focus(); } };
  const onKeyDown = (event) => {
    if (event.key === 'Escape' && position) { event.preventDefault(); event.stopPropagation(); close(); return; }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault(); event.stopPropagation();
      if (!position) { open(); return; }
      setActiveIndex((index) => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : Math.max(0, Math.min(options.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
    } else if (position && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); choose(activeIndex); }
  };
  return <>
    <button ref={triggerRef} id={id} type="button" role="combobox" aria-label={label} aria-expanded={!!position} aria-controls={listId} aria-haspopup="listbox" aria-activedescendant={position ? `${listId}-option-${activeIndex}` : undefined} disabled={disabled} data-review-status={status} className={`glass-select-trigger ${className}`} onClick={(event) => { event.stopPropagation(); position ? close() : open(); }} onKeyDown={onKeyDown}>
      <span className="glass-select-value">{options[selectedIndex]?.label}</span><ChevronDown className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
    </button>
    {position && createPortal(<div ref={listRef} id={listId} role="listbox" aria-label={label} className="glass-select-menu" style={position} onMouseDown={(event) => event.preventDefault()}>
      {options.map((option, index) => <div key={option.value} id={`${listId}-option-${index}`} role="option" aria-selected={option.value === value} aria-disabled={option.disabled || undefined} className={`glass-select-option ${activeIndex === index ? 'is-active' : ''}`} onMouseMove={() => setActiveIndex(index)} onClick={() => choose(index)}>{option.label}{option.value === value && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}</div>)}
    </div>, document.body)}
  </>;
}

function LeftActivityRail({ showDictionary, onToggleDictionary, showSuggestions, onToggleSuggestions, filteredCount, onOpenProjects }) {
  const {
    resetSampleData,
    toggleSearchBar,
    showCommentsPanel,
    toggleCommentsPanel,
    showGlossaryPanel,
    toggleGlossaryPanel,
    toggleUIInspectorModal,
    reviewFilter, setReviewFilter, segments,
  } = useTranslationStore();

  return (
    <aside className="activity-rail w-11 bg-[#161a22] border-r border-[#2c3340] flex flex-col items-center py-3 justify-between select-none shrink-0 z-20">
      <div className="flex flex-col items-center gap-3.5">
        <img
          src={`${import.meta.env.BASE_URL}translation-app.svg`}
          alt="Translia Studio"
          className="w-8 h-8"
        />

        <button type="button" onClick={onOpenProjects} title="Project management" aria-label="Project management" className="p-1.5 rounded-md text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832] transition-colors">
          <FolderOpen className="w-4 h-4" />
        </button>

        <button
          onClick={toggleSearchBar}
          title="Search English and Persian" aria-label="Search English and Persian"
          className="p-1.5 rounded-md text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832] transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={toggleCommentsPanel}
          title={showCommentsPanel ? 'Hide Comments Panel' : 'Show Comments Panel'}
          className={`p-1.5 rounded-md transition-colors ${
            showCommentsPanel
              ? 'text-[#7cb7f0] bg-[#26303d] border border-[#4b83b8]/40'
              : 'text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        <button
          onClick={toggleGlossaryPanel}
          title={showGlossaryPanel ? 'Hide Glossary & QA Panel' : 'Show Glossary & QA Panel'}
          className={`p-1.5 rounded-md transition-colors ${
            showGlossaryPanel
              ? 'text-[#6cd4a6] bg-[#1f332c] border border-[#366954]/50'
              : 'text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
        </button>

        <button type="button" onClick={onToggleDictionary} title={showDictionary ? 'Hide Dictionary' : 'Show Dictionary'}
          aria-label={showDictionary ? 'Hide Dictionary' : 'Show Dictionary'} aria-pressed={showDictionary}
          className={`p-1.5 rounded-md transition-colors ${showDictionary ? 'text-[#7cb7f0] bg-[#26303d] border border-[#4b83b8]/40' : 'text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832]'}`}>
          <BookText className="w-4 h-4" />
        </button>

        <button type="button" onClick={onToggleSuggestions} title={showSuggestions ? 'Hide translation suggestions' : 'Show translation suggestions'}
          aria-label={showSuggestions ? 'Hide translation suggestions' : 'Show translation suggestions'} aria-pressed={showSuggestions}
          className={`p-1.5 rounded-md transition-colors ${showSuggestions ? 'text-[#7cb7f0] bg-[#26303d] border border-[#4b83b8]/40' : 'text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832]'}`}>
          <Lightbulb className="w-4 h-4" />
        </button>

      </div>

      <div className="flex flex-col items-center gap-3.5 text-[#8b95a5]">
        <details className="relative">
          <summary className={`p-1.5 rounded-md cursor-pointer list-none ${reviewFilter !== 'all' ? 'text-[#7cb7f0] bg-[#26303d]' : 'hover:bg-[#222832]'}`} title="Filter segments" aria-label="Filter segments"><Filter className="w-4 h-4" /></summary>
          <div className="absolute bottom-0 left-full ml-2 w-48 p-3 rounded-lg bg-[#161a22] border border-[#323a48] shadow-xl text-xs">
            <label className="block text-[#d5dce6] mb-2" htmlFor="segment-filter">Filter segments</label>
            <GlassSelect id="segment-filter" label="Filter segments" value={reviewFilter} onChange={setReviewFilter} options={SEGMENT_FILTER_OPTIONS} className="w-full" />
            <p className="mt-2 text-[#8b95a5]">{filteredCount} / {segments.length} segments</p>
          </div>
        </details>
        <VisualizerSubToolbar />
      </div>
    </aside>
  );
}

async function parseProjectFile(file) {
  const { autoSplitLists, setToast } = useTranslationStore.getState();
  setToast(`Parsing ${file.name}...`);
  const lowerName = file.name.toLowerCase();
  let paragraphs;
  if (lowerName.endsWith('.pdf')) paragraphs = await extractCleanParagraphsFromPDF(file, autoSplitLists);
  else if (lowerName.endsWith('.docx')) paragraphs = await extractCleanParagraphsFromDocx(file, autoSplitLists);
  else paragraphs = (await file.text()).split(/\r?\n\s*\r?\n|\r?\n/).map((paragraph) => paragraph.trim()).filter((paragraph) => paragraph.length > 0 && !isBinaryGarbageLine(paragraph));
  if (lowerName.endsWith('.docx')) {
    const candidates = findRepeatedPageNumberCandidates(paragraphs);
    if (candidates.length && window.confirm(`${file.name}: found ${candidates.length} standalone numbers in repeated sequential pairs (${candidates[0].value}, ${candidates[0].value}, ... ${candidates.at(-1).value}, ${candidates.at(-1).value}). They may be page numbers, but could be document content.\n\nExclude these paragraphs from this import? Choose Cancel to keep them.`)) {
      const removed = new Set(candidates.map((candidate) => candidate.index));
      paragraphs = paragraphs.filter((_, index) => !removed.has(index));
    }
  }
  if (!paragraphs.length) throw new Error(`No readable paragraphs found in ${file.name}.`);
  return paragraphs;
}

function TopDocumentHeaderBar() {
  const {
    activePresetLesson,
    loadPresetLesson,
    targetFileName,
    segments,
    uploadFileContent,
    setToast,
  } = useTranslationStore();

  const projectNames = useTranslationStore((state) => state.projects);
  const currentProjectName = useTranslationStore((state) => state.projectName);
  const deletedProjectIds = useTranslationStore((state) => state.deletedProjectIds);
  const sourceInputRef = useRef(null);
  const targetInputRef = useRef(null);

  const progressStats = useMemo(() => {
    const done = segments.filter((s) => s.status === 'approved').length;
    const pct = segments.length ? Math.round((done / segments.length) * 100) : 0;
    return { pct };
  }, [segments]);

  const handleFileUpload = async (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const paragraphs = await parseProjectFile(file);
      const otherCount = useTranslationStore.getState().segments.filter((segment) => (type === 'source' ? segment.editedPersian : segment.english).trim()).length;
      const preview = paragraphs.slice(0, 2).map((paragraph) => paragraph.slice(0, 100)).join('\n\n');
      if (window.confirm(`${file.name}: ${paragraphs.length} extracted blocks; the other column has ${otherCount}. Blocks are paired by position; differing boundaries may shift subsequent rows. Count difference: ${Math.abs(paragraphs.length - otherCount)}.\n\nPreview:\n${preview}\n\nReplace the ${type === 'source' ? 'English' : 'Persian'} column?`)) {
        uploadFileContent(type, file.name, paragraphs);
      }
    } catch (error) { setToast(error.message || `Failed to parse ${file.name}.`); }
    e.target.value = '';
  };

  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const handleExportWordDoc = async () => {
    try {
      const [{ Packer }, { createPersianDocument }] = await Promise.all([import('docx'), import('./word-export.js')]);
      const doc = createPersianDocument(segments);
      download(await Packer.toBlob(doc), `Edited_${targetFileName.replace(/\.docx$/i, '')}.docx`);
      setToast('Exported Persian translation as .docx');
    } catch (error) { setToast('Word export failed. Please try again.'); }
  };
  const handleBackup = () => {
    const store = useTranslationStore.getState();
    store.persist();
    const current = useTranslationStore.getState();
    download(new Blob([JSON.stringify({ version: 1, activePresetLesson: current.activePresetLesson, projects: current.projects, deletedProjectIds: current.deletedProjectIds }, null, 2)], { type: 'application/json' }), 'translia-project-backup.json');
    setToast('Project backup downloaded');
  };
  const handleRestore = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text());
      if (backup.version !== 1 || !backup.projects || typeof backup.projects !== 'object' || !Object.values(backup.projects).every((p) => p && Array.isArray(p.segments) && p.segments.length > 0 && p.segments.every((s) => s && typeof s.id === 'string' && typeof s.english === 'string' && typeof s.rawPersian === 'string' && typeof s.editedPersian === 'string') && Array.isArray(p.comments) && Array.isArray(p.glossary) && typeof p.sourceFileName === 'string' && typeof p.targetFileName === 'string')) throw new Error('Invalid backup');
      if (window.confirm('Restore this backup and replace the saved projects in this browser?')) {
        const key = backup.activePresetLesson in backup.projects ? backup.activePresetLesson : Object.keys(backup.projects)[0];
        if (!key) throw new Error('Empty backup');
        useTranslationStore.setState({ projects: backup.projects, deletedProjectIds: Array.isArray(backup.deletedProjectIds) ? backup.deletedProjectIds.filter((id) => typeof id === 'string' && !(id in backup.projects)) : [], ...backup.projects[key], projectName: backup.projects[key].projectName || key, dismissedWarnings: backup.projects[key].dismissedWarnings || {}, activePresetLesson: key, activeSegmentId: backup.projects[key].segments[0]?.id, pastHistory: [], futureHistory: [], selectedSentence: null });
        useTranslationStore.getState().persist();
        setToast('Backup restored');
      }
    } catch { setToast('Could not restore this backup'); }
    event.target.value = '';
  };

  return (
    <header className="app-header h-10 bg-[#161a22] border-b border-[#2c3340] px-3 flex items-center justify-between select-none shrink-0 overflow-hidden">
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center bg-[#222832] p-0.5 rounded-md border border-[#323a48] mr-1 shrink-0">
          {!deletedProjectIds.includes('lesson2') && <button
            onClick={() => loadPresetLesson('lesson2')}
            className={`px-2 py-0.5 rounded text-[10.5px] font-medium transition-colors max-w-[140px] truncate ${
              activePresetLesson === 'lesson2'
                ? 'bg-[#2c3646] text-[#97c4f0] border border-[#4b83b8]/40'
                : 'text-[#8b95a5] hover:text-[#d5dce6]'
            }`}
            title="Load Lesson 2 (02-1.pdf + Persian .docx)"
          >
            {activePresetLesson === 'lesson2' ? currentProjectName : projectNames.lesson2?.projectName || 'Lesson 2'}
          </button>}
          {!deletedProjectIds.includes('lesson3') && <button
            onClick={() => loadPresetLesson('lesson3')}
            className={`px-2 py-0.5 rounded text-[10.5px] font-medium transition-colors max-w-[140px] truncate ${
              activePresetLesson === 'lesson3'
                ? 'bg-[#2c3646] text-[#97c4f0] border border-[#4b83b8]/40'
                : 'text-[#8b95a5] hover:text-[#d5dce6]'
            }`}
            title="Load Lesson 3 (03.pdf + Persian .docx)"
          >
            {activePresetLesson === 'lesson3' ? currentProjectName : projectNames.lesson3?.projectName || 'Lesson 3'}
          </button>}
        </div>

        {!['lesson2', 'lesson3'].includes(activePresetLesson) && <span className="current-project-name" title={currentProjectName}>{currentProjectName}</span>}
        <input id="source-file-input" ref={sourceInputRef} type="file" accept=".pdf,.txt,.md" className="hidden" onChange={(e) => handleFileUpload('source', e)} />
        <input id="target-file-input" ref={targetInputRef} type="file" accept=".docx,.txt,.md" className="hidden" onChange={(e) => handleFileUpload('target', e)} />
      </div>

      <HistoryControls />
      <div className="flex-1" />
      <HeaderStatus progress={progressStats.pct} />

      <div className="flex items-center gap-2 shrink-0">
        <label className="cursor-pointer text-xs text-[#8abaf0]" title="Restore a project backup">Restore<input type="file" accept="application/json,.json" className="hidden" onChange={handleRestore} /></label>

        <button
          onClick={handleExportWordDoc}
          className="glass-ghost-action text-xs font-medium"
        >
          Export .docx
        </button>

        <button
          onClick={handleBackup}
          className="glass-primary-action text-xs font-medium"
        >
          <span>Backup</span>
        </button>
      </div>
    </header>
  );
}

function HistoryControls() {
  const { undo, redo, pastHistory, futureHistory } = useTranslationStore();
  return <div className="history-controls" aria-label="Edit history">
    <button type="button" onClick={undo} disabled={!pastHistory.length} aria-label="Undo" title="Undo"><Undo2 className="w-4 h-4" /></button>
    <button type="button" onClick={redo} disabled={!futureHistory.length} aria-label="Redo" title="Redo"><Redo2 className="w-4 h-4" /></button>
  </div>;
}

function HeaderStatus({ progress }) {
  const { saveError } = useTranslationStore();
  return <div className="flex items-center gap-2 mr-4 shrink-0 text-[11px]">
    <span className={saveError ? 'text-[#e08282]' : 'text-[#6cd4a6]'} title={saveError || 'Saved in this browser'}>{saveError || 'Saved'}</span>
    <div className="approval-progress" role="progressbar" aria-label="Approved segments" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
      <span className="approval-progress-fill" style={{ width: `${progress}%` }} />
      <span className="approval-progress-label">{progress}% Approved</span>
    </div>
  </div>;
}

function ProjectManagement({ onClose }) {
  const { activePresetLesson, projectName, sourceFileName, targetFileName, projects, deletedProjectIds, loadPresetLesson, createProject, deleteCurrentProject } = useTranslationStore();
  const [name, setName] = useState(projectName);
  const [isNew, setIsNew] = useState(false);
  const [sourceFile, setSourceFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (!isNew) setName(projectName); }, [projectName, activePresetLesson, isNew]);
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape' && !creating) onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, creating]);
  const rename = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setName(projectName); return; }
    useTranslationStore.setState({ projectName: trimmed });
    useTranslationStore.getState().persist();
    useTranslationStore.getState().setToast('Project saved');
  };
  const create = async (event) => {
    event.preventDefault();
    if (!name.trim() || creating) return;
    setCreating(true); setError('');
    try {
      const sourceParagraphs = sourceFile ? await parseProjectFile(sourceFile) : null;
      const targetParagraphs = targetFile ? await parseProjectFile(targetFile) : null;
      createProject(name.trim());
      const store = useTranslationStore.getState();
      if (sourceParagraphs) store.uploadFileContent('source', sourceFile.name, sourceParagraphs);
      if (targetParagraphs) store.uploadFileContent('target', targetFile.name, targetParagraphs);
      store.setToast('Project created');
      setIsNew(false); setSourceFile(null); setTargetFile(null);
    } catch (err) { setError(err.message || 'Could not import the selected files.'); }
    finally { setCreating(false); }
  };
  const options = Object.fromEntries(Object.entries({ lesson2: { projectName: 'Lesson 2' }, lesson3: { projectName: 'Lesson 3' }, ...projects }).filter(([id]) => !deletedProjectIds.includes(id)));
  return <div className="project-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !creating) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="project-management-title" className="project-dialog">
      <div className="flex items-center justify-between mb-4"><h2 id="project-management-title" className="text-sm font-semibold">Project management</h2><button type="button" onClick={onClose} disabled={creating} aria-label="Close project management" className="p-1 rounded hover:bg-[#28303d]"><X className="w-4 h-4" /></button></div>
      <label htmlFor="project-select" className="project-label">{isNew ? 'Project' : 'Current project'}</label>
      <GlassSelect id="project-select" label={isNew ? 'Project' : 'Current project'} className="project-input mb-4" disabled={creating} value={isNew ? '__new__' : activePresetLesson} onChange={(selected) => {
        setError('');
        if (selected === '__new__') { setIsNew(true); setName(''); setSourceFile(null); setTargetFile(null); }
        else { setIsNew(false); setSourceFile(null); setTargetFile(null); loadPresetLesson(selected); }
      }} options={[...Object.entries(options).map(([key, project]) => ({ value: key, label: key === activePresetLesson ? projectName : project.projectName || 'Untitled project' })), { value: '__new__', label: '+ Create new project' }]} />
      <p className="project-autosave-note">Edits are saved locally in this browser automatically.</p>
      <form onSubmit={isNew ? create : rename}>
        <label htmlFor="project-name" className="project-label">Project name</label><div className="flex gap-2 mb-4"><input id="project-name" className="project-input" placeholder={isNew ? 'Enter project name' : ''} value={name} onChange={(event) => setName(event.target.value)} maxLength={120} disabled={creating} /></div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {isNew ? <>
            <label className="min-w-0"><span className="project-label">Source (English)</span><span className="project-file" title={sourceFile?.name || 'Choose a source file'}><Upload className="w-4 h-4 shrink-0" /><span className="truncate">{sourceFile?.name || 'Choose file'}</span></span><input type="file" accept=".pdf,.txt,.md" className="hidden" disabled={creating} onChange={(event) => setSourceFile(event.target.files?.[0] || null)} /></label>
            <label className="min-w-0"><span className="project-label">Translation (Persian)</span><span className="project-file" title={targetFile?.name || 'Choose a translation file'}><Upload className="w-4 h-4 shrink-0" /><span className="truncate">{targetFile?.name || 'Choose file'}</span></span><input type="file" accept=".docx,.txt,.md" className="hidden" disabled={creating} onChange={(event) => setTargetFile(event.target.files?.[0] || null)} /></label>
          </> : <>
            <div className="min-w-0"><span className="project-label">Source (English)</span><button type="button" className="project-file" title={sourceFileName} onClick={() => document.getElementById('source-file-input')?.click()}><Upload className="w-4 h-4 shrink-0" /><span className="truncate">{sourceFileName}</span><span className="project-replace">Replace</span></button></div>
            <div className="min-w-0"><span className="project-label">Translation (Persian)</span><button type="button" className="project-file" title={targetFileName} onClick={() => document.getElementById('target-file-input')?.click()}><Upload className="w-4 h-4 shrink-0" /><span className="truncate">{targetFileName}</span><span className="project-replace">Replace</span></button></div>
          </>}
        </div>
        {error && <p role="alert" className="mb-3 text-xs text-[#e08282]">{error}</p>}
        <div className="flex items-center justify-between border-t border-[#323a48] pt-4">
          {!isNew ? <button type="button" className="text-xs text-[#e08282] hover:text-[#ffb0b0]" onClick={() => { if (window.confirm(`Remove project "${projectName}" and its saved contents? This cannot be undone.`)) { deleteCurrentProject(); setError(''); } }}>Remove project</button> : <span />}
          <button type="submit" disabled={!name.trim() || creating} className="project-primary-action">{isNew ? (creating ? 'Creating...' : 'Create project') : 'Save changes'}</button>
        </div>
      </form>
    </section>
  </div>;
}

function VisualizerSubToolbar() {
  const {
    autoSplitLists,
    toggleAutoSplitLists,
    normalizeAndUnmixAllSegments,
    setToast,
    sentenceHighlightEnabled,
    toggleSentenceHighlight,
  } = useTranslationStore();

  return (
    <div className="flex flex-col items-center gap-3.5 text-xs select-none">
      <div className="flex flex-col items-center gap-3.5">
        <details className="relative">
          <summary className="p-1.5 rounded cursor-pointer list-none hover:bg-[#222832]" title="List tools" aria-label="List tools"><List className="w-4 h-4" /></summary>
          <div className="absolute bottom-0 left-full ml-2 z-30 p-2 rounded bg-[#161a22] border border-[#323a48] shadow-xl flex flex-col gap-1 min-w-[175px]">
        <button
          onClick={toggleAutoSplitLists}
          className={`flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-medium transition-colors ${
            autoSplitLists
              ? 'bg-[#26303d] border-[#4b83b8]/50 text-[#97c4f0]'
              : 'bg-[#222832] border-[#323a48] text-[#8b95a5]'
          }`}
          title="Automatically detect and split bullet/numbered lists in PDF & Word files"
        >
          <List className="w-3 h-3" />
          <span>{autoSplitLists ? 'Lists: Split Items' : 'Lists: Grouped'}</span>
        </button>

        <button
          onClick={normalizeAndUnmixAllSegments}
          className="flex items-center gap-1 px-2 py-1 rounded bg-[#1f332c] hover:bg-[#264238] border border-[#366954] text-[#6cd4a6] text-[11px] font-medium transition-colors"
          title="Scan all blocks and separate any mixed lead-in sentences or trailing paragraphs from bullet lists"
        >
          <Wand2 className="w-3 h-3" />
          <span>Unmix Lists</span>
        </button>
          </div>
        </details>

        <button type="button" onClick={toggleSentenceHighlight} aria-pressed={sentenceHighlightEnabled}
          aria-label={`Sentence highlighting ${sentenceHighlightEnabled ? 'on' : 'off'}`}
          title={`Sentence highlighting ${sentenceHighlightEnabled ? 'on' : 'off'}: click to toggle`}
          className={`p-1 rounded border ${sentenceHighlightEnabled ? 'bg-[#26303d] border-[#4b83b8] text-[#bdd9f5]' : 'border-[#323a48] text-[#aab5c5]'}`}>
          <ScanText className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-3.5 text-[#8b95a5]">
          <TranslatorLauncher setToast={setToast} />

        </div>
      </div>


    </div>
  );
}

// ============================================================================
// 7. ENGLISH SOURCE WITH GLOSSARY UNDERLINES & GSAP SVG BEZIER CONNECTOR
// ============================================================================

function EnglishSourceWithUnderlines({ text, glossary, onInsertTerm }) {
  if (!text) {
    return <span className="italic text-[#8b95a5]/60">Empty English block...</span>;
  }

  if (!glossary || glossary.length === 0) {
    return <span>{text}</span>;
  }

  const sorted = [...glossary].sort((a, b) => b.en.length - a.en.length);
  const pattern = sorted.map((g) => g.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        const matched = sorted.find((g) => g.en.toLowerCase() === part.toLowerCase());
        if (matched) {
          return (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInsertTerm(matched.fa);
              }}
              title={`Glossary: "${matched.en}" → "${matched.fa}" (Click to insert & pulse link)`}
              className="inline underline decoration-[#8b95a5] hover:decoration-[#7cb7f0] underline-offset-4 text-[#e2e8f0] hover:text-[#97c4f0] transition-colors cursor-pointer"
            >
              {part}
            </button>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}

function CenterBezierConnector({ variant, segmentId, rowElementRef }) {
  const pulseTrigger = useTranslationStore((s) => s.pulseTrigger);
  const basePathRef = useRef(null);
  const pulsePathRef = useRef(null);
  const startDotRef = useRef(null);
  const endDotRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(80);
  const [drawApproval, setDrawApproval] = useState(false);
  const previousVariant = useRef(variant);

  useEffect(() => {
    const wasApproved = previousVariant.current === 'white';
    previousVariant.current = variant;
    if (variant !== 'white' || wasApproved) {
      setDrawApproval(false);
      return;
    }
    setDrawApproval(true);
    const timeout = setTimeout(() => setDrawApproval(false), 800);
    return () => clearTimeout(timeout);
  }, [variant]);

  const isGreen = variant === 'green' || variant === 'white';
  const strokeColor = variant === 'white' ? '#ffffff' : isGreen ? '#48b885' : '#5899d6';
  const glowColor = variant === 'white' ? '#ffffff' : isGreen ? '#7be0b3' : '#97c4f0';

  const updateGeometryWithGSAP = useCallback(() => {
    if (!variant || !rowElementRef?.current) return;
    const rowEl = rowElementRef.current;
    const enCard = rowEl.querySelector('[data-en-card]');
    const faCard = rowEl.querySelector('[data-fa-card]');
    if (!enCard || !faCard) return;

    const rowHeight = Math.max(64, rowEl.offsetHeight || 80);
    setSvgHeight(rowHeight);

    const enHeight = enCard.offsetHeight || rowHeight;
    const faHeight = faCard.offsetHeight || rowHeight;

    const startY = Math.round(
      Math.min(rowHeight - 14, Math.max(18, enHeight * (isGreen ? 0.36 : 0.44)))
    );
    const endY = Math.round(
      Math.min(rowHeight - 14, Math.max(18, faHeight * (isGreen ? 0.64 : 0.56)))
    );

    const targetPath = `M 0 ${startY} C 14 ${startY}, 14 ${endY}, 28 ${endY}`;

    if (basePathRef.current) {
      gsap.to(basePathRef.current, {
        attr: { d: targetPath },
        stroke: strokeColor,
        duration: 0.38,
        ease: 'power2.out',
      });
    }
    if (pulsePathRef.current) {
      gsap.to(pulsePathRef.current, {
        attr: { d: targetPath },
        stroke: glowColor,
        duration: 0.38,
        ease: 'power2.out',
      });
    }
    if (startDotRef.current) {
      gsap.to(startDotRef.current, {
        attr: { cy: startY },
        fill: strokeColor,
        duration: 0.38,
        ease: 'power2.out',
      });
    }
    if (endDotRef.current) {
      gsap.to(endDotRef.current, {
        attr: { cy: endY },
        fill: strokeColor,
        duration: 0.38,
        ease: 'power2.out',
      });
    }
  }, [variant, isGreen, strokeColor, glowColor, rowElementRef]);

  useEffect(() => {
    if (!variant) return;
    updateGeometryWithGSAP();
    const rowEl = rowElementRef?.current;
    if (!rowEl || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => updateGeometryWithGSAP());
    ro.observe(rowEl);
    return () => ro.disconnect();
  }, [variant, updateGeometryWithGSAP, rowElementRef]);

  useEffect(() => {
    if (!variant || !pulsePathRef.current) return;
    if (variant === 'blue') {
      gsap.set(pulsePathRef.current, { opacity: 0.85, strokeDashoffset: 48 });
      const tween = gsap.to(pulsePathRef.current, {
        strokeDashoffset: 0,
        duration: 1.35,
        repeat: -1,
        ease: 'none',
      });
      return () => {
        tween.kill();
      };
    } else {
      gsap.set(pulsePathRef.current, { opacity: 0 });
    }
  }, [variant]);

  useEffect(() => {
    if (
      !variant ||
      !pulsePathRef.current ||
      pulseTrigger.segmentId !== segmentId ||
      pulseTrigger.timestamp === 0
    ) {
      return;
    }
    gsap.fromTo(
      pulsePathRef.current,
      { opacity: 1, strokeDashoffset: 56, strokeWidth: 3.2 },
      {
        opacity: variant === 'blue' ? 0.85 : 0,
        strokeDashoffset: 0,
        strokeWidth: 2.2,
        duration: 0.65,
        ease: 'power2.out',
      }
    );
  }, [pulseTrigger, segmentId, variant]);

  if (!variant) return <div className="w-7 shrink-0" />;

  const initialStartY = isGreen ? 26 : 32;
  const initialEndY = isGreen ? 54 : 48;
  const initialD = `M 0 ${initialStartY} C 14 ${initialStartY}, 14 ${initialEndY}, 28 ${initialEndY}`;

  return (
    <div className="w-7 shrink-0 flex items-stretch justify-center relative pointer-events-none select-none">
      <svg
        className="w-7 h-full overflow-visible"
        viewBox={`0 0 28 ${svgHeight}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={basePathRef}
          className={variant === 'white' ? `approved-connector ${drawApproval ? 'approved-connector-draw' : ''}` : undefined}
          pathLength="1"
          d={initialD}
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeOpacity="0.85"
          fill="none"
        />
        <path
          ref={pulsePathRef}
          d={initialD}
          stroke={glowColor}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeDasharray="14 34"
          strokeDashoffset="48"
          opacity="0"
          fill="none"
        />
        <circle ref={startDotRef} cx="0" cy={initialStartY} r="2.75" fill={strokeColor} />
        <circle ref={endDotRef} cx="28" cy={initialEndY} r="2.75" fill={strokeColor} />
      </svg>
    </div>
  );
}

// ============================================================================
// 8. AUTO-RESIZING TEXTAREA & PERSIAN GLOSSARY PILLS
// ============================================================================

function useAutoResizeTextarea(textareaRef, value) {
  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    const resize = () => {
      element.style.height = 'auto';
      element.style.height = `${Math.max(48, element.scrollHeight)}px`;
    };
    resize();
    let previousWidth = element.getBoundingClientRect().width;
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width !== undefined && Math.abs(width - previousWidth) > 0.5) {
        previousWidth = width;
        resize();
      }
    });
    observer?.observe(element);
    window.addEventListener('resize', resize);
    document.fonts?.addEventListener('loadingdone', resize);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      document.fonts?.removeEventListener('loadingdone', resize);
    };
  }, [textareaRef, value]);
}

function AutoResizeTextarea({ value, onChange, onKeyDown, onFocus, onBlur, dir = 'rtl', placeholder, className, style, autoFocus }) {
  const textareaRef = useRef(null);

  useAutoResizeTextarea(textareaRef, value);

  return (
    <textarea
      ref={textareaRef}
      dir={dir}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={autoFocus}
      placeholder={placeholder}
      rows={1}
      style={style}
      className={`${className} overflow-hidden`}
    />
  );
}

function HighlightedPersianEditor({ text, sentences, selectedIndex, onChange, onSentenceSelect, onKeyDown }) {
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  useAutoResizeTextarea(textareaRef, text);
  const selectAtCaret = (element) => {
    const position = element.selectionStart;
    const current = splitSentences(element.value);
    let index = current.findIndex((sentence) => position >= sentence.start && position < sentence.end);
    if (index < 0 && current.length && position >= current[current.length - 1].end) index = current.length - 1;
    if (index >= 0) onSentenceSelect(index);
  };

  return (
    <div className="highlight-editor" dir="rtl" lang="fa">
      <div ref={mirrorRef} className="highlight-editor-mirror" aria-hidden="true">
        {sentences.length ? sentences.map((sentence, index) => <span key={sentence.start} className={selectedIndex === index ? 'sentence-highlight' : ''}>{sentence.text}</span>) : text}
      </div>
      <textarea ref={textareaRef} dir="rtl" lang="fa" value={text} rows={1}
        aria-label="Edit Persian translation" placeholder="Enter or edit the Persian translation..."
        onChange={(event) => { onChange(event); selectAtCaret(event.currentTarget); }}
        onSelect={(event) => selectAtCaret(event.currentTarget)}
        onKeyDown={onKeyDown} className="highlight-editor-input" />
    </div>
  );
}

function PersianTextWithGlossaryPills({ text, glossary, onClickEdit }) {
  if (!text) {
    return (
      <div
        onClick={onClickEdit}
        dir="rtl"
        style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
        className="text-[13.5px] leading-[1.95] text-[#8b95a5]/50 text-right cursor-text px-2 py-1.5"
      >
        ترجمه فارسی را اینجا وارد یا ویرایش کنید...
      </div>
    );
  }

  const faTerms = (glossary || [])
    .map((g) => g.fa.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (faTerms.length === 0) {
    return (
      <div
        onClick={onClickEdit}
        dir="rtl"
        style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
        className="text-[13.5px] leading-[1.95] text-[#d5dce6] text-justify cursor-text whitespace-pre-wrap px-2 py-1.5"
      >
        {text}
      </div>
    );
  }

  const pattern = faTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');
  const parts = text.split(regex);

  return (
    <div
      onClick={onClickEdit}
      dir="rtl"
      style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
      className="text-[13.5px] leading-[1.95] text-[#d5dce6] text-justify cursor-text whitespace-pre-wrap px-2 py-1.5"
    >
      {parts.map((part, idx) => {
        if (faTerms.includes(part)) {
          return (
            <span
              key={idx}
              className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-[#2d4663]/75 border border-[#4b83b8]/60 text-[#bdd9f5] text-[12.5px] leading-snug"
            >
              {part}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </div>
  );
}

// ============================================================================
// 9. BILINGUAL SEGMENT ROW (Framer Motion Layout Springs + Resizable Ratio)
// ============================================================================

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 460,
  damping: 36,
  mass: 0.75,
};

function BlockActions({ label, actions }) {
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    if (!position) return;
    menuRef.current?.querySelector('button:not(:disabled)')?.focus();
    const closeOutside = (event) => { if (!buttonRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) setPosition(null); };
    const closeOnKey = (event) => { if (event.key === 'Escape') { setPosition(null); buttonRef.current?.focus(); } };
    const closeOnScroll = () => setPosition(null);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnKey);
    window.addEventListener('scroll', closeOnScroll, true);
    window.addEventListener('resize', closeOnScroll);
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', closeOnKey); window.removeEventListener('scroll', closeOnScroll, true); window.removeEventListener('resize', closeOnScroll); };
  }, [position]);
  const open = (event) => {
    event.stopPropagation();
    if (position) { setPosition(null); return; }
    const rect = event.currentTarget.getBoundingClientRect();
    const height = actions.length * 35 + 18;
    setPosition({ left: Math.max(8, Math.min(window.innerWidth - 232, rect.right - 224)), top: Math.max(8, Math.min(window.innerHeight - height - 8, rect.bottom + 5)) });
  };
  return <>
    <button ref={buttonRef} type="button" className="block-icon-button" onClick={open} aria-label={label} title={label} aria-haspopup="menu" aria-expanded={!!position}><MoreVertical className="w-4 h-4" /></button>
    {position && createPortal(<div ref={menuRef} role="menu" className="block-actions-menu" style={position} onClick={(event) => event.stopPropagation()} onKeyDown={(event) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const items = [...event.currentTarget.querySelectorAll('button:not(:disabled)')];
      const index = items.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }}>
      {actions.map((action) => <button key={action.label} type="button" role="menuitem" className={action.danger ? 'block-action-danger' : ''} disabled={action.disabled} onClick={() => { setPosition(null); action.run(); }}>{action.icon && <action.icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}<span>{action.label}</span></button>)}
    </div>, document.body)}
  </>;
}

const BilingualSegmentRow = React.forwardRef(function BilingualSegmentRow(
  { segment, rowIndex, totalRows, stacked },
  forwardedRef
) {
  const {
    activeSegmentId,
    setActiveSegment,
    updatePersianText,
    updateEnglishText,
    cycleSegmentStatus,
    setSegmentStatus,
    glossary,
    insertGlossaryIntoActive,
    showDiffInline,
    setEditingCommentSegId,
    removeEnglishBlock,
    insertEnglishBlockAt,
    moveEnglishBlock,
    removePersianBlock,
    insertPersianBlockAt,
    movePersianBlock,
    removeRowAt,
    splitSegmentIntoListItems,
    mergeWithNext, splitSegment,
    autoAlignCards,
    enColumnRatio,
    sentenceHighlightEnabled,
    selectedSentence,
    selectSentence,
    markSelectedText,
    clearTextMarks,
    dismissedWarnings,
  } = useTranslationStore();

  const [isEditingSource, setIsEditingSource] = useState(false);
  const [isFocusedFa, setIsFocusedFa] = useState(false);
  const rowElementRef = useRef(null);
  const enTextRef = useRef(null);
  const faTextRef = useRef(null);
  const enSelectionRef = useRef(null);
  const faSelectionRef = useRef(null);
  useTextMarks(enTextRef, segment.english, segment.enHighlights, [isEditingSource, sentenceHighlightEnabled, selectedSentence, glossary]);
  useTextMarks(faTextRef, segment.editedPersian, segment.faHighlights, [isFocusedFa, sentenceHighlightEnabled, showDiffInline, selectedSentence, glossary]);
  const captureSelection = (side) => {
    const root = side === 'en' ? enTextRef.current : faTextRef.current;
    const text = side === 'en' ? segment.english : segment.editedPersian;
    const ref = side === 'en' ? enSelectionRef : faSelectionRef;
    if (root) ref.current = captureTextSelection(root, text);
  };
  const markControl = (side) => {
    const language = side === 'en' ? 'English' : 'Persian';
    const marks = side === 'en' ? segment.enHighlights : segment.faHighlights;
    return <>
      <button type="button" aria-label={`Highlight selected ${language} text in segment ${segment.index}`} title="Highlight selected text"
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => { event.stopPropagation(); markSelectedText(segment.id, side, (side === 'en' ? enSelectionRef : faSelectionRef).current); }}
        className="p-1 rounded hover:bg-[#1b2028] hover:text-[#edd413]">
        <Highlighter className="w-3 h-3" />
      </button>
      <button type="button" aria-label={`Clear ${language} highlights in segment ${segment.index}`} title="Clear highlights in this block"
        disabled={!marks?.length} onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => { event.stopPropagation(); clearTextMarks(segment.id, side); }}
        className="p-1 rounded hover:bg-[#1b2028] hover:text-[#d5dce6] disabled:opacity-25">
        <Eraser className="w-3 h-3" />
      </button>
    </>;
  };

  const setCombinedRef = useCallback(
    (node) => {
      rowElementRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  const isActive = activeSegmentId === segment.id;
  const selectedMatch = sentenceHighlightEnabled && selectedSentence?.segmentId === segment.id
    ? (selectedSentence.sourceIndex != null
      ? { sourceIndex: selectedSentence.sourceIndex, translationIndex: selectedSentence.index, certain: splitSentences(segment.english).length === splitSentences(segment.editedPersian).length, sourceCount: splitSentences(segment.english).length, translationCount: splitSentences(segment.editedPersian).length }
      : matchSentence(segment.english, segment.editedPersian, selectedSentence.index)) : null;
  const enSentences = useMemo(() => splitSentences(segment.english), [segment.english]);
  const faSentences = useMemo(() => splitSentences(segment.editedPersian), [segment.editedPersian]);
  const qaWarnings = useMemo(() => runSegmentQA(segment, glossary).filter((warning) => !dismissedWarnings[warning.id]), [segment, glossary, dismissedWarnings]);
  const diffTokens = useMemo(
    () => computeWordDiff(segment.rawPersian, segment.editedPersian),
    [segment.rawPersian, segment.editedPersian]
  );

  const isListSegment = useMemo(
    () => detectIsListItem(segment.english) || detectIsListItem(segment.editedPersian),
    [segment.english, segment.editedPersian]
  );

  const canSplitIntoList = useMemo(
    () =>
      segment.english.includes(';') ||
      (segment.english.match(/[•●▪]/g) || []).length >= 2 ||
      segment.english.length > 160,
    [segment.english]
  );

  const visualMode = useMemo(() => {
    if (isActive) return 'blue';
    if (segment.status === 'edited') return 'green';
    return 'neutral';
  }, [isActive, segment.status]);

  const leftCardClasses = useMemo(() => {
    if (visualMode === 'blue') {
      return 'bg-[#26303d] border-[#4b83b8] shadow-[0_2px_14px_rgba(75,131,184,0.12)]';
    }
    if (visualMode === 'green') {
      return 'bg-[#222832] border-[#366954]/80';
    }
    return 'bg-[#222832] border-[#2c3340] hover:border-[#3a4354]';
  }, [visualMode]);

  const rightCardClasses = useMemo(() => {
    if (visualMode === 'green') {
      return 'bg-[#1f332c] border-[#366954] shadow-[0_2px_14px_rgba(54,105,84,0.14)]';
    }
    if (visualMode === 'blue') {
      return 'bg-[#26303d] border-[#4b83b8] shadow-[0_2px_14px_rgba(75,131,184,0.14)]';
    }
    return 'bg-[#222832] border-[#2c3340] hover:border-[#3a4354]';
  }, [visualMode]);

  const connectorVariant = useMemo(() => {
    if (segment.status === 'approved') return 'white';
    if (visualMode === 'green') return 'green';
    if (visualMode === 'blue') return 'blue';
    return null;
  }, [visualMode, segment.status]);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      setSegmentStatus(segment.id, 'edited');
      const allSegs = useTranslationStore.getState().segments;
      const idx = allSegs.findIndex((s) => s.id === segment.id);
      if (idx !== -1 && idx + 1 < allSegs.length) {
        setActiveSegment(allSegs[idx + 1].id);
      }
    }
  };

  const leftFlexStyle = stacked ? {} : { flexBasis: `${Math.round(enColumnRatio * 100)}%`, flexGrow: 0, flexShrink: 0 };
  const rightFlexStyle = stacked ? {} : { flexBasis: `${Math.round((1 - enColumnRatio) * 100)}%`, flexGrow: 1, flexShrink: 1 };

  return (
    <motion.div
      ref={setCombinedRef}
      layout="position"
      transition={SPRING_TRANSITION}
      data-segment-row={segment.index}
      data-segment-id={segment.id}
      onClick={() => setActiveSegment(segment.id)}
      className={`group flex ${stacked ? 'flex-col' : 'flex-row'} ${
        autoAlignCards ? 'items-stretch' : 'items-start'
      }`}
    >
      {/* LEFT CARD: ENGLISH SOURCE */}
      <motion.div
        key={segment.enId || `en-${segment.id}`}
        layout="position"
        transition={SPRING_TRANSITION}
        style={leftFlexStyle}
        data-en-card={segment.index}
        data-active={isActive}
        className={`w-full min-w-0 rounded-lg border p-3.5 transition-colors flex flex-col justify-between ${leftCardClasses}`}
      >
        <div>
          <div className="flex min-h-[35px] items-center justify-between mb-2 pb-1.5 border-b border-[#2c3340]/80">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold tracking-wider text-[#8b95a5] uppercase">
                EN #{segment.index}
              </span>
              {isListSegment && (
                <span className="px-2 py-0.5 rounded-full bg-[#26303d] text-[9.5px] font-medium text-[#8abaf0] border border-[#4b83b8]/50 flex items-center gap-1">
                  <List className="w-2.5 h-2.5" />
                  List Item
                </span>
              )}
              {(!segment.english.trim() || !segment.editedPersian.trim()) && <span className="text-[10px] text-[#e0a958]">Unmatched</span>}
            </div>

            <div className="flex items-center gap-0.5 text-[#8b95a5] opacity-80 group-hover:opacity-100 transition-opacity">
              {markControl('en')}
              <button type="button" onClick={(event) => { event.stopPropagation(); setIsEditingSource((value) => !value); }} title="Edit English source" aria-label="Edit English source" className="block-icon-button"><Edit3 className="w-4 h-4" /></button>
              <BlockActions label={`More source actions for segment ${segment.index}`} actions={[
                { label: 'Move block up', icon: ArrowUp, disabled: rowIndex === 0, run: () => moveEnglishBlock(rowIndex, 'up') },
                { label: 'Move block down', icon: ArrowDown, disabled: rowIndex === totalRows - 1, run: () => moveEnglishBlock(rowIndex, 'down') },
                { label: 'Insert block below', icon: Plus, run: () => insertEnglishBlockAt(rowIndex, 'after') },
                ...(canSplitIntoList ? [{ label: 'Split list items', icon: List, run: () => splitSegmentIntoListItems(rowIndex) }] : []),
                { label: 'Split pair', icon: Split, run: () => splitSegment(segment.id) },
                { label: 'Merge pair with next', icon: Merge, disabled: rowIndex === totalRows - 1, run: () => mergeWithNext(segment.id) },
                { label: 'Remove block', icon: Trash2, danger: true, run: () => removeEnglishBlock(rowIndex) },
                { label: 'Delete pair', icon: Trash2, danger: true, run: () => { if (window.confirm('Delete this source and translation pair?')) removeRowAt(rowIndex); } },
              ]} />
            </div>
          </div>

          <div ref={enTextRef} onMouseUp={() => captureSelection('en')} onKeyUp={() => captureSelection('en')}>
          {isEditingSource ? (
            <AutoResizeTextarea
              dir="ltr"
              value={segment.english}
              onChange={(e) => updateEnglishText(segment.id, e.target.value)}
              onBlur={() => setIsEditingSource(false)}
              autoFocus
              className="w-full bg-[#161a22] border border-[#4b83b8]/60 rounded px-2 py-1.5 text-[13.5px] leading-[1.95] text-[#d5dce6] focus:outline-none resize-none text-justify"
            />
          ) : (
            <p
              onDoubleClick={() => setIsEditingSource(true)}
              title="Double-click to edit English text"
              className="px-2 py-1.5 text-[13.5px] leading-[1.95] text-[#d5dce6] font-normal select-text text-justify"
            >
              {sentenceHighlightEnabled && enSentences.length ? enSentences.map((sentence, index) => (
                <span key={sentence.start} className={`sentence-select ${selectedMatch?.sourceIndex === index ? 'sentence-highlight' : ''}`}
                  onClick={() => { if (window.getSelection()?.toString()) return; const translationIndex = faSentences.length ? Math.min(faSentences.length - 1, Math.floor(index * faSentences.length / enSentences.length)) : null; setActiveSegment(segment.id); useTranslationStore.setState({ selectedSentence: { segmentId: segment.id, index: translationIndex, sourceIndex: index } }); }}>
                  <EnglishSourceWithUnderlines text={sentence.text} glossary={glossary} onInsertTerm={insertGlossaryIntoActive} />
                </span>
              )) : <EnglishSourceWithUnderlines text={segment.english} glossary={glossary} onInsertTerm={insertGlossaryIntoActive} />}
            </p>
          )}
          </div>
        </div>
      </motion.div>

      {/* CENTER GSAP BEZIER CONNECTOR */}
      {!stacked && <CenterBezierConnector
        variant={connectorVariant}
        segmentId={segment.id}
        rowElementRef={rowElementRef}
      />}

      {/* RIGHT CARD: PERSIAN RTL INLINE EDITOR */}
      <motion.div
        key={segment.faId || `fa-${segment.id}`}
        layout="position"
        transition={SPRING_TRANSITION}
        style={rightFlexStyle}
        data-fa-card={segment.index}
        data-active={isActive}
        className={`w-full min-w-0 rounded-lg border p-3.5 transition-colors ${stacked ? 'mt-2' : ''} flex flex-col justify-between ${rightCardClasses}`}
      >
        <div>
          <div className="flex min-h-[35px] items-center justify-between mb-2 pb-1.5 border-b border-[#2c3340]/70">
            <div className="flex items-center gap-1.5">
              <span className="text-[10.5px] text-[#8b95a5] font-medium">
                {segment.status === 'unreviewed' ? 'Unreviewed' : `FA #${segment.index}`}
              </span>
              {qaWarnings.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2c241d] border border-[#6b4f2d] text-[#d49b4b] text-[10px] font-semibold">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  QA Flags
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="status-control" data-status={segment.status}><span className="status-dot" aria-hidden="true" /><GlassSelect status={segment.status} label={`Review status for segment ${segment.index}`} value={segment.status} onChange={(value) => setSegmentStatus(segment.id, value)} options={REVIEW_STATUS_OPTIONS} /></span>

              <div className="flex items-center gap-0.5 text-[#8b95a5] opacity-80 group-hover:opacity-100 transition-opacity ml-1">
                {!showDiffInline && markControl('fa')}
                <button type="button" onClick={(event) => { event.stopPropagation(); setEditingCommentSegId(segment.id); }} title="Add comment to this segment" aria-label="Add comment to this segment" className="block-icon-button"><MessageSquare className="w-4 h-4" /></button>
                <BlockActions label={`More translation actions for segment ${segment.index}`} actions={[
                  { label: 'Move block up', icon: ArrowUp, disabled: rowIndex === 0, run: () => movePersianBlock(rowIndex, 'up') },
                  { label: 'Move block down', icon: ArrowDown, disabled: rowIndex === totalRows - 1, run: () => movePersianBlock(rowIndex, 'down') },
                  { label: 'Insert block below', icon: Plus, run: () => insertPersianBlockAt(rowIndex, 'after') },
                  { label: 'Split pair', icon: Split, run: () => splitSegment(segment.id) },
                  { label: 'Merge pair with next', icon: Merge, disabled: rowIndex === totalRows - 1, run: () => mergeWithNext(segment.id) },
                  { label: 'Remove block', icon: Trash2, danger: true, run: () => removePersianBlock(rowIndex) },
                  { label: 'Delete pair', icon: Trash2, danger: true, run: () => { if (window.confirm('Delete this source and translation pair?')) removeRowAt(rowIndex); } },
                ]} />
              </div>
            </div>
          </div>

          <div ref={faTextRef} onMouseUp={() => captureSelection('fa')} onKeyUp={() => captureSelection('fa')}>
          {showDiffInline ? (
            <div
              dir="rtl"
              style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
              className="text-[13.5px] leading-[1.95] text-justify px-2 py-1.5 rounded"
            >
              {diffTokens.map((tok, idx) => {
                if (tok.type === 'added') {
                  return (
                    <span
                      key={idx}
                      className="bg-[#4b83b8]/35 text-[#bdd9f5] px-1 rounded mx-0.5 border-b border-[#7cb7f0]"
                    >
                      {tok.value}{' '}
                    </span>
                  );
                }
                if (tok.type === 'removed') {
                  return (
                    <span key={idx} className="line-through text-[#d67c7c]/75 mx-0.5">
                      {tok.value}{' '}
                    </span>
                  );
                }
                return <span key={idx}>{tok.value} </span>;
              })}
            </div>
          ) : sentenceHighlightEnabled ? (
            <>
              <HighlightedPersianEditor text={segment.editedPersian} sentences={faSentences}
                selectedIndex={selectedMatch?.translationIndex}
                onChange={(event) => updatePersianText(segment.id, event.target.value)}
                onSentenceSelect={(index) => { setActiveSegment(segment.id); selectSentence(segment.id, index); }}
                onKeyDown={handleKeyDown} />
              {selectedMatch && !selectedMatch.certain && <span className="block text-[11px] text-[#e0a958]" dir="ltr">{`Estimated by order: ${selectedMatch.sourceCount} English / ${selectedMatch.translationCount} Persian sentences`}</span>}
            </>
          ) : isFocusedFa ? (
            <AutoResizeTextarea
              dir="rtl" value={segment.editedPersian}
              onChange={(e) => updatePersianText(segment.id, e.target.value)}
              onKeyDown={handleKeyDown} onBlur={() => setIsFocusedFa(false)} autoFocus
              placeholder="Enter or edit the Persian translation..."
              style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
              className="persian-editor-plain w-full bg-transparent text-[13.5px] leading-[1.95] text-[#d5dce6] placeholder-[#8b95a5]/50 focus:outline-none resize-none text-justify selection:bg-[#4b83b8]/40 selection:text-white"
            />
          ) : (
            <PersianTextWithGlossaryPills
              text={segment.editedPersian}
              glossary={glossary}
              onClickEdit={() => setIsFocusedFa(true)}
            />
          )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ============================================================================
// 10. COLUMN 3: COMMENTS & REVISIONS PANEL (@formkit/auto-animate)
// ============================================================================

function CommentItemCard({ c, onSelectSegment, onDelete, replyDraft, onReplyChange, onSendReply }) {
  const [repliesParentRef] = useAutoAnimate({ duration: 220 });

  return (
    <div
      onClick={() => onSelectSegment(c.segmentId)}
      className="rounded-lg bg-[#222832] border border-[#2c3340] hover:border-[#3a4354] p-3 space-y-2 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: c.avatarBg || '#345e54' }}
          >
            {c.author}
          </span>
          <span className="text-[11px] text-[#d5dce6] font-medium">{c.authorFull}</span>
          <span className="text-[10.5px] text-[#8b95a5]">{c.timestamp}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(c.id);
          }}
          title="Delete comment"
          className="text-[#8b95a5] hover:text-[#e08282] p-0.5"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      </div>

      {c.statusTag ? (
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-xs text-[#d4a656] font-medium">{c.text}</span>
          <span className="px-2 py-0.5 rounded bg-[#2d4663] border border-[#4b83b8]/60 text-[#97c4f0] text-[10.5px] font-medium">
            • {c.statusTag}
          </span>
        </div>
      ) : (
        <p className="text-[11.5px] leading-relaxed text-[#b8c2d1] select-text">
          {c.text}{' '}
          {c.highlightWord && (
            <span className="text-[#d4a656] font-medium">{c.highlightWord}</span>
          )}
        </p>
      )}

      <div ref={repliesParentRef} className="pl-2.5 border-l border-[#323a48] space-y-1.5">
        {c.replies &&
          c.replies.map((r) => (
            <div key={r.id} className="text-[11px] text-[#b8c2d1] pt-0.5">
              <strong className="text-[#7cb7f0]">{r.author}: </strong>
              {r.text}
            </div>
          ))}
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center bg-[#161a22] border border-[#2c3340] rounded-md px-2.5 py-1 mt-1"
      >
        <input
          type="text"
          value={replyDraft || ''}
          onChange={(e) => onReplyChange(c.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSendReply(c.id);
          }}
          placeholder="Reply..."
          className="bg-transparent text-[11px] text-[#d5dce6] placeholder-[#8b95a5] focus:outline-none flex-1"
        />
        <button
          type="button"
          onClick={() => onSendReply(c.id)}
          className="text-[#8b95a5] hover:text-[#7cb7f0] transition-colors"
        >
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function CommentsRevisionsColumn() {
  const {
    comments,
    segments,
    activeSegmentId,
    setActiveSegment,
    navigateToSegment,
    editingCommentSegId,
    setEditingCommentSegId,
    addComment,
    addReplyToComment,
    deleteComment,
    toggleCommentsPanel,
    commentsPanelWidth,
  } = useTranslationStore();

  const [commentsParentRef] = useAutoAnimate({ duration: 240 });
  const [newCommentText, setNewCommentText] = useState('');
  const [bottomCommentDraft, setBottomCommentDraft] = useState('');
  const [replyDrafts, setReplyDrafts] = useState({});

  const handleCreateComment = (e) => {
    e.preventDefault();
    const targetSegId = editingCommentSegId || activeSegmentId || segments[0]?.id;
    if (!targetSegId || !newCommentText.trim()) return;
    addComment(targetSegId, newCommentText);
    setNewCommentText('');
  };

  const handleBottomCreateComment = (e) => {
    e.preventDefault();
    const targetSegId = activeSegmentId || segments[0]?.id;
    if (!targetSegId || !bottomCommentDraft.trim()) return;
    addComment(targetSegId, bottomCommentDraft);
    setBottomCommentDraft('');
  };

  const handleSendReply = (commentId) => {
    const text = replyDrafts[commentId];
    if (!text || !text.trim()) return;
    addReplyToComment(commentId, text);
    setReplyDrafts((prev) => ({ ...prev, [commentId]: '' }));
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={SPRING_TRANSITION}
      style={{ width: commentsPanelWidth }}
      className="review-drawer bg-[#161a22] border-l border-[#2c3340] flex flex-col shrink-0 select-none"
    >
      <div className="h-9 px-3.5 border-b border-[#2c3340] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#d5dce6]">Comments</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditingCommentSegId(activeSegmentId)}
            title="New comment on active segment"
            className="p-1 rounded text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleCommentsPanel}
            title="Hide Comments Panel"
            className="p-1 rounded text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832] transition-colors"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {editingCommentSegId && (
        <form
          onSubmit={handleCreateComment}
          className="p-3 bg-[#222832] border-b border-[#2c3340] space-y-2"
        >
          <div className="flex items-center justify-between text-[11px] text-[#7cb7f0]">
            <span>
              Comment on SEG #{segments.find((s) => s.id === editingCommentSegId)?.index || 1}
            </span>
            <button
              type="button"
              onClick={() => setEditingCommentSegId(null)}
              className="text-[#8b95a5] hover:text-[#d5dce6]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write revision note..."
            rows={2}
            className="w-full bg-[#161a22] border border-[#323a48] rounded p-2 text-xs text-[#d5dce6] focus:outline-none focus:border-[#4b83b8]"
          />
          <button
            type="submit"
            className="w-full py-1 rounded bg-[#436996] hover:bg-[#4e78a8] text-white text-xs font-medium"
          >
            Post Comment
          </button>
        </form>
      )}

      <div ref={commentsParentRef} className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
        {comments.map((c) => (
          <CommentItemCard
            key={c.id}
            c={c}
            onSelectSegment={navigateToSegment}
            onDelete={deleteComment}
            replyDraft={replyDrafts[c.id]}
            onReplyChange={(id, val) => setReplyDrafts((prev) => ({ ...prev, [id]: val }))}
            onSendReply={handleSendReply}
          />
        ))}
      </div>

      <form
        onSubmit={handleBottomCreateComment}
        className="p-2.5 border-t border-[#2c3340] bg-[#161a22] flex items-center gap-1.5"
      >
        <input
          type="text"
          value={bottomCommentDraft}
          onChange={(e) => setBottomCommentDraft(e.target.value)}
          placeholder="New comment on segment..."
          className="flex-1 bg-[#222832] border border-[#2c3340] rounded-md px-2.5 py-1.5 text-xs text-[#d5dce6] placeholder-[#8b95a5] focus:outline-none focus:border-[#4b83b8]"
        />
        <button
          type="submit"
          className="p-1.5 rounded-md bg-[#436996] hover:bg-[#4e78a8] text-white transition-colors"
          title="Send comment"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </motion.aside>
  );
}

// ============================================================================
// 11. COLUMN 4: CONSISTENCY & QUALITY PANEL (@formkit/auto-animate Glossary)
// ============================================================================

function ConsistencyQualityColumn() {
  const {
    segments,
    glossary,
    insertGlossaryIntoActive,
    addGlossaryTerm,
    deleteGlossaryTerm,
    setActiveSegment,
    updatePersianText,
    toggleGlossaryPanel,
    glossaryPanelWidth,
    dismissedWarnings,
    dismissWarning,
    restoreWarnings,
    navigateToSegment,
  } = useTranslationStore();

  const [glossaryParentRef] = useAutoAnimate({ duration: 220 });
  const [showAddGlossary, setShowAddGlossary] = useState(false);
  const [enInput, setEnInput] = useState('');
  const [faInput, setFaInput] = useState('');

  const allWarnings = useMemo(
    () => segments.flatMap((seg) => runSegmentQA(seg, glossary)).filter((warning) => !dismissedWarnings[warning.id]),
    [segments, glossary, dismissedWarnings]
  );

  const primaryWarning = allWarnings[0] || {
    segmentId: 'seg-1',
    segmentIndex: 1,
    message: 'All numbers and glossary terms verified across segments.',
    suggestion: null,
  };

  const handleAddTerm = (e) => {
    e.preventDefault();
    if (!enInput.trim() || !faInput.trim()) return;
    addGlossaryTerm(enInput, faInput);
    setEnInput('');
    setFaInput('');
    setShowAddGlossary(false);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={SPRING_TRANSITION}
      style={{ width: glossaryPanelWidth }}
      className="review-drawer bg-[#161a22] border-l border-[#2c3340] flex flex-col shrink-0 select-none"
    >
      <div className="h-9 px-3.5 border-b border-[#2c3340] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#d5dce6]">Consistency & Quality</span>
        <button
          onClick={toggleGlossaryPanel}
          title="Hide Glossary & QA Panel"
          className="p-1 rounded text-[#8b95a5] hover:text-[#d5dce6] hover:bg-[#222832] transition-colors"
        >
          <EyeOff className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        <div className="rounded-lg bg-[#2c241d] border border-[#6b4f2d] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#e0a958]">QA warning panel</span>
            <AlertTriangle className="w-3.5 h-3.5 text-[#e0a958]" />
          </div>
          <p className="text-[11px] text-[#c6b49c]">Suggestions need review; wording and numbers can legitimately differ.</p>
          {allWarnings.length === 0 ? <p className="text-xs">No active warnings.</p> : <div className="space-y-2 max-h-64 overflow-y-auto">
            {allWarnings.map((warning) => <div key={warning.id} className="border-t border-[#6b4f2d]/50 pt-2">
              <button type="button" className="text-left text-[11px] text-[#bdd9f5] hover:underline" onClick={() => navigateToSegment(warning.segmentId)}>{warning.message}</button>
              <button type="button" className="block mt-1 text-[10px] text-[#e0a958] underline" onClick={() => {
                const reason = window.prompt('Why is this difference acceptable?');
                if (reason?.trim()) dismissWarning(warning.id, reason.trim());
              }}>Dismiss with reason</button>
            </div>)}
          </div>}
          <p className="text-[10px] text-[#e0a958]">{allWarnings.length} active</p>
          {Object.keys(dismissedWarnings).length > 0 && <details className="text-[10px] text-[#bdd9f5]">
            <summary className="cursor-pointer">Dismissed warnings ({Object.keys(dismissedWarnings).length})</summary>
            <ul className="space-y-1 py-1">{Object.entries(dismissedWarnings).map(([id, reason]) => <li key={id}><span className="text-[#d5dce6]">{id}</span>: {reason}</li>)}</ul>
            <button type="button" className="underline" onClick={restoreWarnings}>Restore all</button>
          </details>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-xs font-semibold text-[#d5dce6]">Glossary</span>
            <button
              onClick={() => setShowAddGlossary((v) => !v)}
              className="text-[11px] text-[#7cb7f0] hover:text-[#97c4f0] flex items-center gap-0.5"
            >
              <Plus className="w-3 h-3" />
              Add
            </button>
          </div>

          {showAddGlossary && (
            <form
              onSubmit={handleAddTerm}
              className="p-2.5 rounded-lg bg-[#222832] border border-[#323a48] space-y-2"
            >
              <input
                type="text"
                value={enInput}
                onChange={(e) => setEnInput(e.target.value)}
                placeholder="English term..."
                className="w-full bg-[#161a22] border border-[#2c3340] rounded px-2 py-1 text-xs text-[#d5dce6] focus:outline-none"
              />
              <input
                type="text"
                dir="rtl"
                value={faInput}
                onChange={(e) => setFaInput(e.target.value)}
                placeholder="معادل فارسی..."
                style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
                className="w-full bg-[#161a22] border border-[#2c3340] rounded px-2 py-1 text-xs text-[#d5dce6] focus:outline-none text-right"
              />
              <button
                type="submit"
                className="w-full py-1 rounded bg-[#436996] hover:bg-[#4e78a8] text-white text-xs font-medium"
              >
                Save Term
              </button>
            </form>
          )}

          <div
            ref={glossaryParentRef}
            className="rounded-lg bg-[#222832] border border-[#2c3340] divide-y divide-[#2c3340]"
          >
            {glossary.map((item) => (
              <div
                key={item.id}
                onClick={() => insertGlossaryIntoActive(item.fa)}
                title="Click to insert Persian term into active paragraph & fire GSAP link pulse"
                className="group px-3 py-2.5 flex items-center justify-between hover:bg-[#28303d] transition-colors cursor-pointer"
              >
                <span className="text-xs text-[#d5dce6] font-medium truncate max-w-[110px]">
                  {item.en} <span className="text-[#8b95a5] ml-0.5">-&gt;</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    dir="rtl"
                    style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
                    className="text-xs text-[#d5dce6] font-medium"
                  >
                    {item.fa}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGlossaryTerm(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-[#8b95a5] hover:text-[#e08282] transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

// ============================================================================
// 12. MAIN ROOT APPLICATION (Resizable EN/FA Columns + 60fps Virtualization)
// ============================================================================

export default function App() {
  const {
    segments,
    searchQuery,
    setSearchQuery,
    showSearchBar,
    showDiffInline,
    toggleDiffInline,
    toastMessage,
    showCommentsPanel,
    showGlossaryPanel,
    insertRowAt,
    insertEnglishBlockAt,
    insertPersianBlockAt,
    setPanelWidth,
    setEnColumnRatio,
    enColumnRatio,
    virtualizedMode,
    setUIAuditReport,
    reviewFilter,
    setReviewFilter,
    glossary,
    dismissedWarnings,
    activeSegmentId,
    selectedSentence,
    navigateToSegment,
    saveError,
  } = useTranslationStore();

  const [showDictionary, setShowDictionary] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [stackedSegments, setStackedSegments] = useState(() => window.innerWidth <= window.screen.availWidth * 0.65);
  useEffect(() => {
    const updateLayout = () => {
      const editorWidth = editorHeaderRef.current?.getBoundingClientRect().width ?? window.innerWidth;
      setStackedSegments(window.innerWidth <= window.screen.availWidth * 0.65 || editorWidth < 780);
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateLayout);
    if (editorHeaderRef.current) observer?.observe(editorHeaderRef.current);
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => { observer?.disconnect(); window.removeEventListener('resize', updateLayout); };
  }, []);
  const workspaceRef = useRef(null);
  const editorHeaderRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(720);

  useEffect(() => {
    const id = 'translia-vazirmatn-font-v9';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const filteredSegments = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return segments.filter((s) => {
      const searchMatches = !q.trim() || s.english.toLowerCase().includes(q) || s.editedPersian.toLowerCase().includes(q);
      const statusMatches = reviewFilter === 'all' || (reviewFilter === 'unmatched'
        ? !s.english.trim() || !s.editedPersian.trim()
        : reviewFilter === 'warnings'
        ? runSegmentQA(s, glossary).some((warning) => !dismissedWarnings[warning.id])
        : s.status === reviewFilter);
      return searchMatches && statusMatches;
    });
  }, [segments, searchQuery, reviewFilter, glossary, dismissedWarnings]);
  const segmentIndices = useMemo(() => new Map(segments.map((segment, index) => [segment.id, index])), [segments]);
  // 60fps Virtualized Windowing Calculation for large PDF/Word books
  const { visibleSegments, topSpacerHeight, bottomSpacerHeight, startIndex } = useMemo(() => {
    if (!virtualizedMode || filteredSegments.length <= 45) {
      return {
        visibleSegments: filteredSegments,
        topSpacerHeight: 0,
        bottomSpacerHeight: 0,
        startIndex: 0,
      };
    }
    const avgRowHeight = 148;
    const overscan = 6;
    const rawStart = Math.floor(scrollTop / avgRowHeight);
    const start = Math.max(0, rawStart - overscan);
    const visibleCount = Math.ceil(viewportHeight / avgRowHeight) + overscan * 2;
    const end = Math.min(filteredSegments.length, start + visibleCount);

    return {
      visibleSegments: filteredSegments.slice(start, end),
      topSpacerHeight: start * avgRowHeight,
      bottomSpacerHeight: Math.max(0, (filteredSegments.length - end) * avgRowHeight),
      startIndex: start,
    };
  }, [virtualizedMode, filteredSegments, scrollTop, viewportHeight]);

  const runLiveDOMAlignmentCheck = useCallback(() => {
    if (!workspaceRef.current) return;
    setViewportHeight(workspaceRef.current.clientHeight || 720);
    const rows = workspaceRef.current.querySelectorAll('[data-segment-row]');
    let maxDeltaY = 0;
    let maxDeltaH = 0;
    let misalignedRows = 0;

    rows.forEach((row) => {
      const enCard = row.querySelector('[data-en-card]');
      const faCard = row.querySelector('[data-fa-card]');
      if (enCard && faCard && !stackedSegments) {
        const enRect = enCard.getBoundingClientRect();
        const faRect = faCard.getBoundingClientRect();
        const dy = Math.round(Math.abs(enRect.top - faRect.top));
        const dh = Math.round(Math.abs(enRect.height - faRect.height));
        if (dy > maxDeltaY) maxDeltaY = dy;
        if (dh > maxDeltaH) maxDeltaH = dh;
        if (dy > 2 || dh > 2) misalignedRows++;
      }
    });

    const listItemsCount = segments.filter(
      (s) => detectIsListItem(s.english) || detectIsListItem(s.editedPersian)
    ).length;

    const score = Math.max(85, 100 - misalignedRows * 5);

    setUIAuditReport({
      passed: misalignedRows === 0,
      score,
      checkedRows: rows.length,
      misalignedRows,
      maxDeltaY,
      maxDeltaH,
      listItemsCount,
      overflowDetected: false,
      lastCheckedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    });
  }, [segments, stackedSegments, setUIAuditReport]);

  useEffect(() => {
    const timer = setTimeout(runLiveDOMAlignmentCheck, 180);
    window.addEventListener('resize', runLiveDOMAlignmentCheck);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', runLiveDOMAlignmentCheck);
    };
  }, [runLiveDOMAlignmentCheck, segments, showCommentsPanel, showGlossaryPanel, enColumnRatio]);

  // Drag resizer for right-hand drawers
  const startResizeDrag = (panel, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const initialWidth =
      panel === 'comments'
        ? useTranslationStore.getState().commentsPanelWidth
        : useTranslationStore.getState().glossaryPanelWidth;

    const onMouseMove = (moveEvent) => {
      const delta = startX - moveEvent.clientX;
      setPanelWidth(panel, initialWidth + delta);
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Drag resizer between English Source and Persian Translation columns
  const startBilingualColumnDrag = (e) => {
    e.preventDefault();
    const container = editorHeaderRef.current || workspaceRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const onMouseMove = (moveEvent) => {
      const relativeX = moveEvent.clientX - rect.left;
      const ratio = relativeX / Math.max(rect.width, 300);
      setEnColumnRatio(ratio);
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        scrollbarColor: '#323a48 #161a22',
      }}
      className="h-screen w-full bg-[#1b2028] text-[#d5dce6] flex overflow-hidden select-none"
    >
      <LeftActivityRail showDictionary={showDictionary} onToggleDictionary={() => { setShowDictionary((open) => !open); setShowSuggestions(false); }} showSuggestions={showSuggestions} onToggleSuggestions={() => { if (!showSuggestions && !useTranslationStore.getState().sentenceHighlightEnabled) useTranslationStore.getState().toggleSentenceHighlight(); setShowSuggestions((open) => !open); setShowDictionary(false); }} filteredCount={filteredSegments.length} onOpenProjects={() => setShowProjects(true)} />

      {showProjects && <ProjectManagement onClose={() => setShowProjects(false)} />}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopDocumentHeaderBar />
        {saveError && <div role="alert" className="px-4 py-2 text-xs bg-[#4a252b] text-[#ffd0d0] border-b border-[#9b4c56]">{saveError}</div>}

        {reviewFilter !== 'all' && <div className="active-filter" role="status"><Filter className="w-3.5 h-3.5" /><span>{({ unmatched: 'Unmatched blocks', unreviewed: 'Unreviewed', edited: 'In progress', needs_check: 'Needs attention', approved: 'Approved', warnings: 'QA warnings' })[reviewFilter]} {'\u00b7'} {filteredSegments.length} / {segments.length}</span><button type="button" onClick={() => setReviewFilter('all')}>Clear filter</button></div>}

        {showSearchBar && (
          <div className="bg-[#161a22] border-b border-[#2c3340] px-4 py-1.5 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#7cb7f0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in English PDF segments or Persian translation..."
              autoFocus
              className="bg-transparent text-xs text-[#d5dce6] placeholder-[#8b95a5] focus:outline-none flex-1"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-[#8b95a5] hover:text-[#d5dce6]"
              >
                Clear
              </button>
            )}
          </div>
        )}

        <div className="flex-1 flex min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0 bg-[#1b2028]">
            {/* Sticky Column Sub-Headers with Draggable EN/FA Column Splitter */}
            <div
              ref={editorHeaderRef}
              className="h-9 px-4 border-b border-[#2c3340] bg-[#161a22]/60 flex items-center text-xs shrink-0"
            >
              <div
                style={{ flexBasis: `${Math.round(enColumnRatio * 100)}%`, flexGrow: 0, flexShrink: 0 }}
                className="flex items-center justify-between pr-2 min-w-[180px]"
              >
                <span className="text-[#8b95a5] font-medium whitespace-nowrap">Source (English)</span>
                <button
                  onClick={() => insertEnglishBlockAt(segments.length - 1, 'after')}
                  className="px-2 py-0.5 rounded bg-[#222832] hover:bg-[#28303d] border border-[#323a48] text-[10.5px] text-[#8abaf0] flex items-center gap-1 transition-colors shrink-0"
                  title="Append a new English paragraph block"
                >
                  <Plus className="w-2.5 h-2.5" />
                  Add EN Block
                </button>
              </div>

                <div
                  onMouseDown={startBilingualColumnDrag}
                  onDoubleClick={() => setEnColumnRatio(0.5)}
                  title="Drag to resize English / Persian columns (double-click to reset 50/50)"
                  className={`w-7 h-full ${stackedSegments ? 'hidden' : 'flex'} items-center justify-center cursor-col-resize group hover:bg-[#4b83b8]/15 transition-colors shrink-0`}
                >
                  <GripVertical className="w-3.5 h-3.5 text-[#8b95a5]/60 group-hover:text-[#7cb7f0]" />
                </div>

              <div className="flex-1 flex items-center justify-between pl-2 min-w-[200px]">
                <span className="text-[#8b95a5] font-medium whitespace-nowrap">Translation (Persian)</span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => insertPersianBlockAt(segments.length - 1, 'after')}
                    className="px-2 py-0.5 rounded bg-[#1f332c] hover:bg-[#264238] border border-[#366954] text-[10.5px] text-[#6cd4a6] flex items-center gap-1 transition-colors shrink-0"
                    title="Append a new Persian paragraph block"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    Add FA Block
                  </button>
                  <button
                    onClick={toggleDiffInline}
                    type="button"
                    aria-label={`Diff view ${showDiffInline ? 'on' : 'off'}`}
                    aria-pressed={showDiffInline}
                    title={`Diff view ${showDiffInline ? 'on' : 'off'}: click to toggle`}
                    className={`p-1 rounded border transition-colors shrink-0 ${
                      showDiffInline
                        ? 'bg-[#26303d] border-[#4b83b8] text-[#97c4f0]'
                        : 'bg-[#222832] border-[#323a48] text-[#d5dce6] hover:border-[#4b83b8]/50'
                    }`}
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Paragraph Rows with Motion Layout Physics & Optional Virtualization */}
            <div
              ref={workspaceRef}
              onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
              className={`flex-1 overflow-y-auto px-4 py-3.5 space-y-3 ${segments.length >= 100 ? 'large-document' : ''}`}
            >
              {topSpacerHeight > 0 && <div style={{ height: topSpacerHeight }} />}

              <AnimatePresence initial={false}>
                {visibleSegments.map((seg) => (
                  <BilingualSegmentRow
                    key={seg.id}
                    segment={seg}
                    rowIndex={segmentIndices.get(seg.id)}
                    totalRows={segments.length}
                    stacked={stackedSegments}
                  />
                ))}
              </AnimatePresence>

              {bottomSpacerHeight > 0 && <div style={{ height: bottomSpacerHeight }} />}

              <div className="pt-2 pb-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => insertEnglishBlockAt(segments.length - 1, 'after')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222832] hover:bg-[#28303d] border border-[#323a48] text-xs text-[#8abaf0] transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add English Block
                </button>
                <button
                  onClick={() => insertRowAt(segments.length - 1, 'after')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222832] hover:bg-[#28303d] border border-[#323a48] text-xs text-[#d5dce6] transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add Paired Row
                </button>
                <button
                  onClick={() => insertPersianBlockAt(segments.length - 1, 'after')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222832] hover:bg-[#28303d] border border-[#323a48] text-xs text-[#6cd4a6] transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add Persian Block
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showCommentsPanel && (
              <>
                <div
                  onMouseDown={(e) => startResizeDrag('comments', e)}
                  title="Drag to resize Comments panel"
                  className="w-1 bg-transparent hover:bg-[#4b83b8]/50 cursor-col-resize transition-colors shrink-0"
                />
                <CommentsRevisionsColumn />
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showGlossaryPanel && (
              <>
                <div
                  onMouseDown={(e) => startResizeDrag('glossary', e)}
                  title="Drag to resize Glossary panel"
                  className="w-1 bg-transparent hover:bg-[#4b83b8]/50 cursor-col-resize transition-colors shrink-0"
                />
                <ConsistencyQualityColumn />
              </>
            )}
          </AnimatePresence>
          {showDictionary && <DictionaryPanel onClose={() => setShowDictionary(false)} />}
          {showSuggestions && <SuggestionsPanel selectedSentence={selectedSentence} segment={segments.find((segment) => segment.id === selectedSentence?.segmentId)} onClose={() => setShowSuggestions(false)} />}
        </div>
      </div>

      <UIInspectorModal />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-4 right-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#222832] border border-[#4b83b8]/60 text-xs text-[#d5dce6] shadow-2xl"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#58c496]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
