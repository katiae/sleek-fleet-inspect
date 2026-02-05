
# Make Case Details Page Responsive for Mobile

## Overview
The case details page currently uses fixed layouts that don't adapt well to mobile screens. This plan updates the layout to stack elements vertically on mobile and adjust spacing/typography for smaller screens.

---

## Changes Required

### 1. CaseManager.tsx - Reduce Mobile Padding
The container has `px-11` padding which is too wide on mobile.

**Change:**
- Update padding from `px-11 py-6` to `px-4 py-4 md:px-11 md:py-6`

---

### 2. CaseDetail.tsx - Header and Tabs
**Header Section (lines 106-128):**
- Stack title and actions button vertically on mobile
- Change from `flex justify-between items-start` to `flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start`

**Tabs Navigation (lines 133-149):**
- Make tabs horizontally scrollable on mobile
- Add `overflow-x-auto` to the TabsList container
- Reduce spacing between tabs on mobile: `space-x-4 sm:space-x-8`

**Overview Grid (line 153):**
- Already uses `grid-cols-1 xl:grid-cols-4` which is good
- No changes needed here

---

### 3. SummarySection.tsx - Card Layouts
**Job Details Card (lines 42-93):**
- Stack the date display and job details vertically on mobile
- Change `flex` to `flex flex-col sm:flex-row`
- Adjust date section margins for mobile: `mr-0 mb-4 sm:mr-12 sm:mb-0`
- Reduce large day number font size on mobile: `text-[40px] sm:text-[64px]`

**Access Details Card (lines 96-147):**
- Stack map placeholder and access details vertically on mobile
- Change the map `w-1/3` to `w-full h-32 sm:w-1/3 sm:h-full`
- Change `flex` to `flex flex-col sm:flex-row`

**Case Brief Grid (line 155):**
- Already uses `grid-cols-1 md:grid-cols-3` which handles mobile

---

### 4. CaseDetailsTab.tsx - Accordion Grids
**Multiple Grid Sections (lines 26, 170, 314):**
- Change `grid-cols-2` to `grid-cols-1 md:grid-cols-2`
- This applies to:
  - Instruction tab grid (line 26)
  - Job Details tab grid (line 170)
  - Vehicle Insights tab grid (line 314)
  - Risks tab content

---

## Technical Details

### Files to Modify:
1. `src/components/CaseManager.tsx` - Container padding
2. `src/components/CaseDetail.tsx` - Header and tabs layout
3. `src/components/case-detail/SummarySection.tsx` - Card layouts
4. `src/components/case-detail/CaseDetailsTab.tsx` - Grid layouts

### Breakpoints Used:
- `sm:` (640px) - For header and card layouts
- `md:` (768px) - For case details tab grids and brief grid
- `xl:` (1280px) - Already in use for main content grid

### No Changes Needed:
- `TasksSection.tsx` - Already uses flexible layout
- `ActivitySection.tsx` - Already responsive
- `ContactsSection.tsx` - Already uses single-column layout
