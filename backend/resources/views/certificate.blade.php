<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    @page {
        size: A4 landscape;
        margin: 0;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        position: relative;
        width: 297mm;
        height: 210mm;
        font-family: 'DejaVu Sans', sans-serif;
        background: #fdfbf5;
    }
    .page {
        width: 297mm;
        padding: 10mm;
    }

    /* Borders */
    .border-outer {
        position: absolute;
        top: 10mm; left: 10mm; right: 10mm; bottom: 10mm;
        border: 1.6pt solid #b8923f;
    }
    .border-inner {
        position: absolute;
        top: 13mm; left: 13mm; right: 13mm; bottom: 13mm;
        border: 0.8pt solid #b8923f;
    }

    /* Corner ornaments */
    .corner {
        position: absolute;
        width: 16mm;
        height: 16mm;
    }
    .corner-tl { top: 13mm; left: 13mm; border-top: 2.4pt solid #b8923f; border-left: 2.4pt solid #b8923f; }
    .corner-tr { top: 13mm; right: 13mm; border-top: 2.4pt solid #b8923f; border-right: 2.4pt solid #b8923f; }
    .corner-bl { bottom: 13mm; left: 13mm; border-bottom: 2.4pt solid #b8923f; border-left: 2.4pt solid #b8923f; }
    .corner-br { bottom: 13mm; right: 13mm; border-bottom: 2.4pt solid #b8923f; border-right: 2.4pt solid #b8923f; }

    /* Content */
    .content {
        position: relative;
        padding: 15mm 30mm 0;
        text-align: center;
    }

    .brand {
        font-size: 10pt;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #8a8a8a;
    }

    .eyebrow {
        margin-top: 10mm;
        font-size: 11pt;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: #b8923f;
        font-weight: bold;
    }

    .title {
        margin-top: 4mm;
        font-family: 'Times New Roman', Georgia, serif;
        font-size: 34pt;
        font-weight: bold;
        color: #1a2744;
        letter-spacing: 1px;
    }

    .divider-table {
        display: table;
        width: 60mm;
        margin: 5mm auto 0;
    }
    .divider-row { display: table-row; }
    .divider-cell-line { display: table-cell; width: 24mm; vertical-align: middle; }
    .divider-cell-line div { border-top: 0.8pt solid #b8923f; }
    .divider-cell-star { display: table-cell; width: 6mm; text-align: center; vertical-align: middle; color: #b8923f; font-size: 12pt; }

    .presented-to {
        margin-top: 9mm;
        font-size: 12pt;
        color: #666;
        font-style: italic;
    }

    .student-name {
        margin-top: 5mm;
        font-family: 'Times New Roman', Georgia, serif;
        font-size: 30pt;
        font-weight: bold;
        color: #16213e;
    }

    .name-underline {
        width: 90mm;
        margin: 3mm auto 0;
        border-top: 0.8pt solid #b8923f;
    }

    .course-text {
        margin-top: 9mm;
        font-size: 12pt;
        color: #666;
    }

    .course-name {
        margin-top: 3mm;
        font-family: 'Times New Roman', Georgia, serif;
        font-size: 20pt;
        font-weight: bold;
        font-style: italic;
        color: #1a2744;
    }

    /* Footer */
    .footer-table {
        display: table;
        width: 100%;
        table-layout: fixed;
        margin-top: 10mm;
    }
    .footer-row { display: table-row; }
    .footer-cell {
        display: table-cell;
        width: 33.33%;
        text-align: center;
        vertical-align: bottom;
    }
    .footer-value {
        font-size: 12pt;
        color: #333;
        font-family: 'Times New Roman', Georgia, serif;
        font-style: italic;
    }
    .footer-line {
        width: 48mm;
        margin: 3mm auto 2mm;
        border-top: 0.8pt solid #444;
    }
    .footer-label {
        font-size: 8.5pt;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #888;
    }

    .seal-outer {
        width: 24mm;
        height: 24mm;
        border-radius: 50%;
        border: 1.4pt solid #b8923f;
        display: table;
        margin: 0 auto 2mm;
    }
    .seal-inner {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    .seal-star { color: #b8923f; font-size: 13pt; }
    .seal-text {
        font-size: 6.5pt;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #b8923f;
        font-weight: bold;
        margin-top: 1mm;
    }

    .cert-number {
        margin-top: 5mm;
        font-size: 8.5pt;
        color: #999;
        letter-spacing: 1px;
    }
    .cert-number span {
        font-family: 'DejaVu Sans Mono', monospace;
        color: #555;
    }
</style>
</head>
<body>
<div class="border-outer"></div>
<div class="border-inner"></div>
<div class="corner corner-tl"></div>
<div class="corner corner-tr"></div>
<div class="corner corner-bl"></div>
<div class="corner corner-br"></div>
<div class="page">
    <div class="content">
        <div class="brand">E-Learning Platform</div>
        <div class="eyebrow">Certificate of Achievement</div>
        <div class="title">Certificate of Completion</div>

        <div class="divider-table">
            <div class="divider-row">
                <div class="divider-cell-line"><div></div></div>
                <div class="divider-cell-star">&#10022;</div>
                <div class="divider-cell-line"><div></div></div>
            </div>
        </div>

        <div class="presented-to">This certificate is proudly presented to</div>
        <div class="student-name">{{ $certificate->student->name }}</div>
        <div class="name-underline"></div>

        <div class="course-text">for successfully completing the course</div>
        <div class="course-name">{{ $certificate->course->title }}</div>

        <div class="footer-table">
            <div class="footer-row">
                <div class="footer-cell">
                    <div class="footer-value">{{ \Carbon\Carbon::parse($certificate->issued_at)->format('F d, Y') }}</div>
                    <div class="footer-line"></div>
                    <div class="footer-label">Date Issued</div>
                </div>
                <div class="footer-cell">
                    <div class="seal-outer">
                        <div class="seal-inner">
                            <div class="seal-star">&#10022;</div>
                            <div class="seal-text">Verified</div>
                        </div>
                    </div>
                </div>
                <div class="footer-cell">
                    <div class="footer-value">E-Learning Platform</div>
                    <div class="footer-line"></div>
                    <div class="footer-label">Authorized Signature</div>
                </div>
            </div>
        </div>

        <div class="cert-number">CERTIFICATE NO. <span>{{ $certificate->certificate_number }}</span></div>
    </div>
</div>
</body>
</html>