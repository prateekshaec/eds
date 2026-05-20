export default function decorate(block) {
  // Store the tab data from block rows
  const tabData = [];

  [...block.children].forEach((row) => {
    const columns = [...row.children];
    const label = columns[0]?.textContent.trim();
    const content = columns[1];
    if (label && content) {
      tabData.push({ label, content });
    }
  });

  // Clear the original block content
  block.textContent = '';

  // ---- Build Tab Navigation ----
  const tabNav = document.createElement('div');
  tabNav.className = 'tabs-nav';
  tabNav.setAttribute('role', 'tablist');

  // ---- Build Tab Panels Container ----
  const tabPanels = document.createElement('div');
  tabPanels.className = 'tabs-panels';

  // ---- Create each tab + panel ----
  tabData.forEach((tab, index) => {
    // Create tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.textContent = tab.label;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('tabindex', index === 0 ? '0' : '-1');

    // Create tab panel
    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.hidden = index !== 0;
    panel.append(tab.content);

    // Add click handler
    button.addEventListener('click', () => {
      // Deactivate all tabs
      tabNav.querySelectorAll('.tabs-tab').forEach((t) => {
        t.classList.remove('tabs-tab-active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      // Hide all panels
      tabPanels.querySelectorAll('.tabs-panel').forEach((p) => {
        p.hidden = true;
      });

      // Activate clicked tab
      button.classList.add('tabs-tab-active');
      button.setAttribute('aria-selected', 'true');
      button.setAttribute('tabindex', '0');
      panel.hidden = false;
    });

    // Set first tab as active
    if (index === 0) {
      button.classList.add('tabs-tab-active');
    }

    tabNav.append(button);
    tabPanels.append(panel);
  });

  // ---- Add keyboard navigation (accessibility) ----
  tabNav.addEventListener('keydown', (e) => {
    const tabs = [...tabNav.querySelectorAll('.tabs-tab')];
    const currentIndex = tabs.indexOf(document.activeElement);

    let newIndex;
    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    e.preventDefault();
    tabs[newIndex].focus();
    tabs[newIndex].click();
  });

  // ---- Assemble the block ----
  block.append(tabNav, tabPanels);
}
