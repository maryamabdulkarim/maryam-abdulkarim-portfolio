import { execSync } from 'child_process';
import fs from 'fs';

console.log('Regenerating EcoSmart composite graphics with 100% full screens (ZERO cropping)...');

const outDir = '/app/applet/public/images/ecosmart';
fs.mkdirSync(outDir, { recursive: true });

// Always copy the raw uncropped Edit Collection as a standalone asset as well
execSync(`cp public/assets/aistudio/Edit_Collection_4d5f0064.png public/images/ecosmart/edit-collection.png`);

// 1. Build v1-v2.png WITHOUT cropping any screen elements
try {
  console.log('Building v1-v2.png (full proportional scaling, zero crop)...');
  // Proportional resize preserving all content
  execSync(`
    convert public/images/ecosmart/version-0-dashboard.png -resize 900x /tmp/v0_full.png
    convert public/images/ecosmart/v1-dashboard.png -resize 900x /tmp/v1_full.png
    
    # Get max height between the two
    V0_H=$(identify -format "%h" /tmp/v0_full.png)
    V1_H=$(identify -format "%h" /tmp/v1_full.png)
    MAX_H=$(( V0_H > V1_H ? V0_H : V1_H ))
    CANVAS_H=$(( MAX_H + 340 ))
    
    convert -size 2040x\${CANVAS_H} xc:"#F9FAF8" \\
      -fill "#111827" -font DejaVu-Sans-Bold -pointsize 32 -gravity NorthWest -annotate +70+50 "Version 1 → Version 2: Communication & Safety Architecture" \\
      -fill "#6B7280" -font DejaVu-Sans -pointsize 18 -annotate +70+95 "Closing the safety loop: moving from off-platform WhatsApp deals to full in-app traceability" \\
      \\
      -fill "#DC2626" -font DejaVu-Sans-Bold -pointsize 22 -annotate +70+165 "VERSION 1 (MVP TESTED)" \\
      -fill "#4B5563" -font DejaVu-Sans -pointsize 16 -annotate +70+200 "Off-platform WhatsApp handovers · Unverified transactions · No dispute trace" \\
      \\
      -fill "#3F7A22" -font DejaVu-Sans-Bold -pointsize 22 -annotate +1070+165 "VERSION 2 (CURRENT)" \\
      -fill "#4B5563" -font DejaVu-Sans -pointsize 16 -annotate +1070+200 "In-app chat and calls · Verifiable weight receipts · Flagged amount safety net" \\
      \\
      \\( /tmp/v0_full.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +70+250 -composite \\
      \\( /tmp/v1_full.png -bordercolor "#3F7A22" -border 2 \\) -geometry +1070+250 -composite \\
      public/images/ecosmart/v1-v2.png
  `, { stdio: 'inherit' });
  console.log('Created v1-v2.png successfully');
} catch (e) {
  console.error('Error creating v1-v2.png', e);
}

// 2. Build user-flows.png WITHOUT cropping any screen elements
try {
  console.log('Building user-flows.png (full proportional scaling, zero crop)...');
  execSync(`
    convert public/assets/aistudio/Waste_Identified___Known_kg_de712930.png -resize 480x /tmp/uf_scan.png
    convert public/assets/aistudio/Recycler_detail___Kubwa_Green_Hub_30a28d31.png -resize 480x /tmp/uf_detail.png
    convert public/assets/aistudio/1.10_Request___Waiting_78571496.png -resize 480x /tmp/uf_req.png
    convert public/assets/aistudio/Recyclers_Dashboard_463965fc.png -resize 480x /tmp/uf_dash.png

    # Find maximum height of the scaled screens
    MAX_H=2350
    CANVAS_H=$(( MAX_H + 340 ))

    convert -size 2240x\${CANVAS_H} xc:"#FBFBFB" \\
      -fill "#111827" -font DejaVu-Sans-Bold -pointsize 32 -gravity NorthWest -annotate +60+45 "Two-Sided Marketplace User Flow" \\
      -fill "#4B5563" -font DejaVu-Sans -pointsize 18 -annotate +60+90 "Parallel user journeys designed to establish mutual trust and verified transactions" \\
      \\
      -fill "#3F7A22" -font DejaVu-Sans-Bold -pointsize 18 -annotate +60+150 "HOUSEHOLD: 1. AI Scan" \\
      -fill "#3F7A22" -font DejaVu-Sans-Bold -pointsize 18 -annotate +600+150 "HOUSEHOLD: 2. Compare Hubs" \\
      -fill "#3F7A22" -font DejaVu-Sans-Bold -pointsize 18 -annotate +1140+150 "HOUSEHOLD: 3. Safe Dispatch" \\
      -fill "#3F7A22" -font DejaVu-Sans-Bold -pointsize 18 -annotate +1680+150 "RECYCLER: 4. Hub Operations" \\
      \\
      \\( /tmp/uf_scan.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +60+190 -composite \\
      \\( /tmp/uf_detail.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +600+190 -composite \\
      \\( /tmp/uf_req.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +1140+190 -composite \\
      \\( /tmp/uf_dash.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +1680+190 -composite \\
      public/images/ecosmart/user-flows.png
  `, { stdio: 'inherit' });
  console.log('Created user-flows.png successfully');
} catch (e) {
  console.error('Error creating user-flows.png', e);
}

// 3. Build final-screens.png with 100% COMPLETE Edit Collection (ZERO CROP)
try {
  console.log('Building final-screens.png with 100% complete Edit Collection screen...');
  
  // Proportional resize with ZERO cropping:
  // Household Row (Row 1):
  // - Persona onboarding: Account_selection_type_5972ebba.png (ratio 672x1020)
  // - AI Identification: Waste_Identified___Known_kg_de712930.png (ratio 480x1320)
  // - Pickup request tracking: 1.10_Request___Waiting_78571496.png (ratio 480x1111)
  // Recycler Row (Row 2):
  // - Verified Hub Details: Recycler_detail___Kubwa_Green_Hub_30a28d31.png (ratio 480x1895)
  // - Edit: What do you collect? (FULL): Edit_Collection_4d5f0064.png (ratio 1280x3862 - 100% FULL)
  
  execSync(`
    # Row 1 Household screens (scaled to uniform width 680px)
    convert public/assets/aistudio/Account_selection_type_5972ebba.png -resize 680x /tmp/fs_role_full.png
    convert public/assets/aistudio/Waste_Identified___Known_kg_de712930.png -resize 680x /tmp/fs_scan_full.png
    convert public/assets/aistudio/1.10_Request___Waiting_78571496.png -resize 680x /tmp/fs_req_full.png
    
    # Row 2 Recycler screens - both scaled to width 1050px with 100% FULL height, ZERO cropping!
    convert public/assets/aistudio/Recycler_detail___Kubwa_Green_Hub_30a28d31.png -resize 1050x /tmp/fs_hub_full.png
    convert public/assets/aistudio/Edit_Collection_4d5f0064.png -resize 1050x /tmp/fs_edit_col_full.png

    # Check heights
    H_ROLE=$(identify -format "%h" /tmp/fs_role_full.png)
    H_SCAN=$(identify -format "%h" /tmp/fs_scan_full.png)
    H_REQ=$(identify -format "%h" /tmp/fs_req_full.png)
    ROW1_H=$(( H_SCAN > H_REQ ? H_SCAN : H_REQ ))
    
    H_HUB=$(identify -format "%h" /tmp/fs_hub_full.png)
    H_EDIT=$(identify -format "%h" /tmp/fs_edit_col_full.png)
    ROW2_H=$(( H_HUB > H_EDIT ? H_HUB : H_EDIT ))
    
    ROW1_Y=230
    ROW2_TITLE_Y=$(( ROW1_Y + ROW1_H + 90 ))
    ROW2_SUB_Y=$(( ROW2_TITLE_Y + 40 ))
    ROW2_Y=$(( ROW2_TITLE_Y + 80 ))
    TOTAL_CANVAS_H=$(( ROW2_Y + ROW2_H + 100 ))

    convert -size 2340x\${TOTAL_CANVAS_H} xc:"#FBFBFB" \\
      -fill "#111827" -font DejaVu-Sans-Bold -pointsize 36 -gravity NorthWest -annotate +60+50 "EcoSmart AI — Final High-Fidelity Mobile Screens" \\
      -fill "#4B5563" -font DejaVu-Sans -pointsize 20 -annotate +60+100 "End-to-end mobile experience across household scanning, recycler directories, pickup tracking, and collection management" \\
      \\
      -fill "#3F7A22" -font DejaVu-Sans-Bold -pointsize 24 -annotate +60+165 "HOUSEHOLD EXPERIENCE" \\
      -fill "#6B7280" -font DejaVu-Sans -pointsize 16 -annotate +60+198 "1. Persona Onboarding  ·  2. AI Waste Identification with Price Range  ·  3. Pickup Request & Live Tracking" \\
      \\
      \\( /tmp/fs_role_full.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +60+\${ROW1_Y} -composite \\
      \\( /tmp/fs_scan_full.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +800+\${ROW1_Y} -composite \\
      \\( /tmp/fs_req_full.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +1540+\${ROW1_Y} -composite \\
      \\
      -fill "#3F7A22" -font DejaVu-Sans-Bold -pointsize 24 -annotate +60+\${ROW2_TITLE_Y} "RECYCLER EXPERIENCE & COLLECTION MANAGEMENT" \\
      -fill "#6B7280" -font DejaVu-Sans -pointsize 16 -annotate +60+\${ROW2_SUB_Y} "4. Verified Hub Profile & Rates  ·  5. Complete Collection Services, Materials Accepted & Pricing Setup (Full Screen)" \\
      \\
      \\( /tmp/fs_hub_full.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +60+\${ROW2_Y} -composite \\
      \\( /tmp/fs_edit_col_full.png -bordercolor "#E5E7EB" -border 2 \\) -geometry +1180+\${ROW2_Y} -composite \\
      \\
      public/images/ecosmart/final-screens.png
  `, { stdio: 'inherit' });
  console.log('Created final-screens.png with 100% complete Edit Collection successfully');
} catch (e) {
  console.error('Error creating final-screens.png', e);
}
