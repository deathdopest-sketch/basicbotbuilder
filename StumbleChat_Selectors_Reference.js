// StumbleChat Selectors Reference - Complete List of All Selectors
// This file contains all the selectors used in StumbleChat for easy copying to other bots

const STUMBLECHAT_SELECTORS = {
  // === LOGIN PAGE SELECTORS ===
  login: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    submit: 'input[type="submit"]',
    loginForm: 'form[action*="login"]',
    errorMessage: '.error, .alert, .warning',
    successMessage: '.success, .message'
  },

  // === VERIFICATION SELECTORS ===
  verification: [
    '#interact',  // Primary verification button
    'button#interact',
    'button:contains("VERIFY")',
    'button:contains("Verify")',
    '.verify-button',
    '#verify',
    'input[value*="Verify"]',
    'input[value*="VERIFY"]',
    '[onclick*="verify"]',
    '[onclick*="VERIFY"]'
  ],

  // === CHAT INTERFACE SELECTORS ===
  chat: {
    messageInput: '#textarea',
    sendButton: 'button[type="submit"], input[type="submit"]',
    messageContainer: '.messages, #messages, .chat-messages',
    messageList: 'ul.messages, .message-list',
    individualMessage: '.message, .msg, li.message',
    messageText: '.message-text, .msg-text, .content',
    messageAuthor: '.author, .username, .user',
    messageTime: '.time, .timestamp, .date'
  },

  // === MEDIA/MUSIC SELECTORS ===
  media: {
    mediaButton: '#media',
    youtubeButton: '#youtube',
    spotifyButton: '#spotify',
    soundcloudButton: '#soundcloud',
    modalInput: '#modal-text-input',
    modalInputPlaceholder: '#modal-text-input[placeholder*="Link/Keyword Search"]',
    modalInputGeneric: '#modal-text-input',
    searchButton: '#search',
    modalExit: '#modal-exit',
    modalClose: '.modal-close, .close-modal',
    modalOverlay: '.modal-overlay, .modal-backdrop'
  },

  // === ROOM SETTINGS SELECTORS ===
  room: {
    optionsButton: 'button.dropbtn img[alt="Options"]',
    settingsButton: '#room-settings',
    topicInput: '#room-topic',
    topicSubmit: 'input[type="submit"]',
    roomName: '.room-name, #room-name',
    roomTitle: '.room-title, h1, h2',
    roomDescription: '.room-description, .description'
  },

  // === USER MANAGEMENT SELECTORS ===
  users: {
    userList: '.users, #users, .user-list',
    userBars: 'li.bar[user-id]',
    userItem: 'li.user, .user-item',
    nickname: '.nickname',
    username: '.username',
    userAvatar: '.avatar, .user-avatar, img[alt*="avatar"]',
    changeNickButton: '#change-nick',
    changeNickInput: '#modal-text-input[placeholder*="guest"]',
    userMenu: '.user-menu, .dropdown-menu',
    userActions: '.user-actions, .actions'
  },

  // === MUSIC/TRACK SELECTORS ===
  music: {
    currentSong: '.current-song, .now-playing, .playing',
    songTitle: '.song-title, .track-title, .title',
    songArtist: '.song-artist, .track-artist, .artist',
    songDuration: '.song-duration, .track-duration, .duration',
    songProgress: '.song-progress, .progress-bar, .progress',
    playButton: '.play-button, .play, [title*="play"]',
    pauseButton: '.pause-button, .pause, [title*="pause"]',
    nextButton: '.next-button, .next, [title*="next"]',
    prevButton: '.prev-button, .prev, [title*="previous"]',
    volumeControl: '.volume, .volume-control, input[type="range"]',
    songElements: '[class*="song"], [class*="title"], [class*="track"]',
    musicPlayer: '.music-player, .player, #player'
  },

  // === MODAL DIALOG SELECTORS ===
  modals: {
    modal: '.modal, #modal, .dialog',
    modalContent: '.modal-content, .dialog-content',
    modalHeader: '.modal-header, .dialog-header',
    modalBody: '.modal-body, .dialog-body',
    modalFooter: '.modal-footer, .dialog-footer',
    modalClose: '.modal-close, .close, .close-button',
    modalExit: '#modal-exit',
    modalOverlay: '.modal-overlay, .modal-backdrop',
    modalTitle: '.modal-title, .dialog-title, h3, h4'
  },

  // === NAVIGATION SELECTORS ===
  navigation: {
    homeLink: 'a[href="/"], .home-link',
    roomsLink: 'a[href*="rooms"], .rooms-link',
    profileLink: 'a[href*="profile"], .profile-link',
    settingsLink: 'a[href*="settings"], .settings-link',
    logoutLink: 'a[href*="logout"], .logout-link',
    backButton: '.back-button, .back, [title*="back"]',
    forwardButton: '.forward-button, .forward, [title*="forward"]'
  },

  // === FORM SELECTORS ===
  forms: {
    input: 'input, textarea, select',
    textInput: 'input[type="text"], input[type="email"], input[type="password"]',
    textarea: 'textarea',
    select: 'select',
    checkbox: 'input[type="checkbox"]',
    radio: 'input[type="radio"]',
    submit: 'input[type="submit"], button[type="submit"]',
    reset: 'input[type="reset"], button[type="reset"]',
    button: 'button, input[type="button"]'
  },

  // === NOTIFICATION SELECTORS ===
  notifications: {
    notification: '.notification, .alert, .message',
    success: '.success, .alert-success, .message-success',
    error: '.error, .alert-error, .message-error',
    warning: '.warning, .alert-warning, .message-warning',
    info: '.info, .alert-info, .message-info',
    closeButton: '.close, .close-button, .dismiss'
  },

  // === LOADING/SPINNER SELECTORS ===
  loading: {
    spinner: '.spinner, .loading, .loader',
    loadingText: '.loading-text, .loading-message',
    progressBar: '.progress-bar, .progress',
    loadingOverlay: '.loading-overlay, .spinner-overlay'
  },

  // === DROPDOWN SELECTORS ===
  dropdowns: {
    dropdown: '.dropdown, .dropbtn',
    dropdownMenu: '.dropdown-menu, .dropdown-content',
    dropdownItem: '.dropdown-item, .menu-item',
    dropdownToggle: '.dropdown-toggle, .dropdown-btn'
  },

  // === BUTTON SELECTORS ===
  buttons: {
    primary: '.btn-primary, .primary-button',
    secondary: '.btn-secondary, .secondary-button',
    success: '.btn-success, .success-button',
    danger: '.btn-danger, .danger-button',
    warning: '.btn-warning, .warning-button',
    info: '.btn-info, .info-button',
    small: '.btn-sm, .small-button',
    large: '.btn-lg, .large-button',
    disabled: '.btn-disabled, .disabled-button, [disabled]'
  },

  // === LAYOUT SELECTORS ===
  layout: {
    header: 'header, .header, .top-bar',
    footer: 'footer, .footer, .bottom-bar',
    sidebar: '.sidebar, .side-bar, .nav',
    main: 'main, .main, .content',
    container: '.container, .wrapper, .page',
    row: '.row, .grid-row',
    column: '.col, .column, .grid-col'
  },

  // === INTERACTION SELECTORS ===
  interactions: {
    clickable: '[onclick], .clickable, .interactive',
    hoverable: '.hover, .hoverable',
    draggable: '.draggable, [draggable="true"]',
    droppable: '.droppable, .drop-zone',
    selectable: '.selectable, .select',
    focusable: 'input, textarea, select, button, [tabindex]'
  },

  // === CONTENT SELECTORS ===
  content: {
    text: 'p, span, div, h1, h2, h3, h4, h5, h6',
    image: 'img, .image, .picture',
    link: 'a, .link',
    list: 'ul, ol, .list',
    listItem: 'li, .list-item',
    table: 'table, .table',
    tableRow: 'tr, .table-row',
    tableCell: 'td, th, .table-cell'
  },

  // === ATTRIBUTE SELECTORS ===
  attributes: {
    hasId: '[id]',
    hasClass: '[class]',
    hasTitle: '[title]',
    hasAlt: '[alt]',
    hasHref: '[href]',
    hasSrc: '[src]',
    hasValue: '[value]',
    hasPlaceholder: '[placeholder]',
    hasData: '[data-*]',
    hasAria: '[aria-*]'
  },

  // === PSEUDO SELECTORS ===
  pseudo: {
    firstChild: ':first-child',
    lastChild: ':last-child',
    nthChild: ':nth-child(n)',
    firstOfType: ':first-of-type',
    lastOfType: ':last-of-type',
    onlyChild: ':only-child',
    empty: ':empty',
    not: ':not()',
    contains: ':contains()',
    has: ':has()'
  }
};

// === SELECTOR UTILITIES ===
const SelectorUtils = {
  // Get all selectors as a flat array
  getAllSelectors() {
    const selectors = [];
    const traverse = (obj, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          selectors.push({ name: prefix + key, selector: value });
        } else if (Array.isArray(value)) {
          value.forEach((selector, index) => {
            selectors.push({ name: `${prefix}${key}[${index}]`, selector });
          });
        } else if (typeof value === 'object') {
          traverse(value, prefix + key + '.');
        }
      }
    };
    traverse(STUMBLECHAT_SELECTORS);
    return selectors;
  },

  // Get selectors by category
  getSelectorsByCategory(category) {
    return STUMBLECHAT_SELECTORS[category] || {};
  },

  // Find selector by name
  findSelector(name) {
    const selectors = this.getAllSelectors();
    return selectors.find(s => s.name === name);
  },

  // Get all verification selectors
  getVerificationSelectors() {
    return STUMBLECHAT_SELECTORS.verification;
  },

  // Get all chat selectors
  getChatSelectors() {
    return STUMBLECHAT_SELECTORS.chat;
  },

  // Get all media selectors
  getMediaSelectors() {
    return STUMBLECHAT_SELECTORS.media;
  },

  // Get all user selectors
  getUserSelectors() {
    return STUMBLECHAT_SELECTORS.users;
  },

  // Get all room selectors
  getRoomSelectors() {
    return STUMBLECHAT_SELECTORS.room;
  },

  // Get all music selectors
  getMusicSelectors() {
    return STUMBLECHAT_SELECTORS.music;
  },

  // Get all modal selectors
  getModalSelectors() {
    return STUMBLECHAT_SELECTORS.modals;
  },

  // Get all form selectors
  getFormSelectors() {
    return STUMBLECHAT_SELECTORS.forms;
  },

  // Get all button selectors
  getButtonSelectors() {
    return STUMBLECHAT_SELECTORS.buttons;
  },

  // Get all notification selectors
  getNotificationSelectors() {
    return STUMBLECHAT_SELECTORS.notifications;
  },

  // Get all loading selectors
  getLoadingSelectors() {
    return STUMBLECHAT_SELECTORS.loading;
  },

  // Get all dropdown selectors
  getDropdownSelectors() {
    return STUMBLECHAT_SELECTORS.dropdowns;
  },

  // Get all layout selectors
  getLayoutSelectors() {
    return STUMBLECHAT_SELECTORS.layout;
  },

  // Get all interaction selectors
  getInteractionSelectors() {
    return STUMBLECHAT_SELECTORS.interactions;
  },

  // Get all content selectors
  getContentSelectors() {
    return STUMBLECHAT_SELECTORS.content;
  },

  // Get all attribute selectors
  getAttributeSelectors() {
    return STUMBLECHAT_SELECTORS.attributes;
  },

  // Get all pseudo selectors
  getPseudoSelectors() {
    return STUMBLECHAT_SELECTORS.pseudo;
  }
};

// === SELECTOR VALIDATION ===
const SelectorValidator = {
  // Validate if selector exists in DOM
  async validateSelector(page, selector) {
    try {
      const element = await page.$(selector);
      return element !== null;
    } catch (error) {
      return false;
    }
  },

  // Validate multiple selectors
  async validateSelectors(page, selectors) {
    const results = {};
    for (const selector of selectors) {
      results[selector] = await this.validateSelector(page, selector);
    }
    return results;
  },

  // Find working selector from array
  async findWorkingSelector(page, selectors) {
    for (const selector of selectors) {
      if (await this.validateSelector(page, selector)) {
        return selector;
      }
    }
    return null;
  },

  // Get all working selectors
  async getWorkingSelectors(page, selectors) {
    const working = [];
    for (const selector of selectors) {
      if (await this.validateSelector(page, selector)) {
        working.push(selector);
      }
    }
    return working;
  }
};

// === SELECTOR TESTING ===
const SelectorTester = {
  // Test all selectors on a page
  async testAllSelectors(page) {
    const results = {};
    const allSelectors = SelectorUtils.getAllSelectors();
    
    for (const { name, selector } of allSelectors) {
      try {
        const element = await page.$(selector);
        results[name] = {
          selector: selector,
          exists: element !== null,
          error: null
        };
      } catch (error) {
        results[name] = {
          selector: selector,
          exists: false,
          error: error.message
        };
      }
    }
    
    return results;
  },

  // Test selectors by category
  async testSelectorsByCategory(page, category) {
    const selectors = SelectorUtils.getSelectorsByCategory(category);
    const results = {};
    
    for (const [name, selector] of Object.entries(selectors)) {
      if (typeof selector === 'string') {
        try {
          const element = await page.$(selector);
          results[name] = {
            selector: selector,
            exists: element !== null,
            error: null
          };
        } catch (error) {
          results[name] = {
            selector: selector,
            exists: false,
            error: error.message
          };
        }
      }
    }
    
    return results;
  },

  // Generate selector report
  generateReport(testResults) {
    const total = Object.keys(testResults).length;
    const working = Object.values(testResults).filter(r => r.exists).length;
    const broken = total - working;
    
    return {
      total: total,
      working: working,
      broken: broken,
      successRate: (working / total * 100).toFixed(2) + '%',
      results: testResults
    };
  }
};

// === EXPORT FOR USE ===
module.exports = {
  STUMBLECHAT_SELECTORS,
  SelectorUtils,
  SelectorValidator,
  SelectorTester
};

// === USAGE EXAMPLES ===
/*
// Basic usage
const { STUMBLECHAT_SELECTORS } = require('./StumbleChat_Selectors_Reference');

// Get specific selectors
const loginSelectors = STUMBLECHAT_SELECTORS.login;
const chatSelectors = STUMBLECHAT_SELECTORS.chat;
const mediaSelectors = STUMBLECHAT_SELECTORS.media;

// Use in Puppeteer
await page.waitForSelector(STUMBLECHAT_SELECTORS.chat.messageInput);
await page.click(STUMBLECHAT_SELECTORS.media.mediaButton);

// Utility usage
const { SelectorUtils } = require('./StumbleChat_Selectors_Reference');

// Get all selectors
const allSelectors = SelectorUtils.getAllSelectors();

// Get selectors by category
const chatSelectors = SelectorUtils.getChatSelectors();
const mediaSelectors = SelectorUtils.getMediaSelectors();

// Find specific selector
const messageInput = SelectorUtils.findSelector('chat.messageInput');

// Validation usage
const { SelectorValidator } = require('./StumbleChat_Selectors_Reference');

// Validate single selector
const isValid = await SelectorValidator.validateSelector(page, '#textarea');

// Validate multiple selectors
const results = await SelectorValidator.validateSelectors(page, [
  '#textarea',
  '#media',
  '#youtube'
]);

// Find working selector
const workingSelector = await SelectorValidator.findWorkingSelector(page, [
  '#textarea',
  'textarea',
  'input[type="text"]'
]);

// Testing usage
const { SelectorTester } = require('./StumbleChat_Selectors_Reference');

// Test all selectors
const testResults = await SelectorTester.testAllSelectors(page);

// Test specific category
const chatResults = await SelectorTester.testSelectorsByCategory(page, 'chat');

// Generate report
const report = SelectorTester.generateReport(testResults);
console.log(`Success rate: ${report.successRate}`);
*/
