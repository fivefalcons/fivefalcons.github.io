# Driver recruitment and application review

Review date: November 16, 2026. Draft for implementation and review by transportation/employment counsel; not a determination that either driver category qualifies as an independent contractor.

## Original draft review (superseded by implementation update below)

`careers.html` advertises company-truck and owner-operator opportunities. `apply.html` is a disabled, clearly labeled review draft with no submission endpoint. No applicant information, signatures or sample scans are included in this repository. Do not enable fields until a secure intake/signature provider and production validation are implemented.

## Corrections to the supplied packet

| Sample area | Treatment |
| --- | --- |
| Applicant identity, addresses, licenses, experience, accidents and convictions | Retain the required qualification information, including explicit None answers and the applicable lookback periods. |
| Work history and salary fields | Request all employers in the last three years plus seven additional years of CMV employment. Include FMCSR and DOT testing status for the recent employers; remove salary history. |
| Broad criminal-history questions | Omit from initial application; retain required motor-vehicle conviction questions. Any later criminal screening must follow applicable timing and individualized-assessment rules. |
| Annual driver violation certification (page 7) | Remove obsolete 391.27 certification. Carrier annual MVR inquiry/review remains required. |
| Urinalysis authorization (page 8) | Replace outdated regulatory references with the current Part 382/Part 40 testing workflow, managed separately by the testing provider. |
| FCRA disclosure and testing questionnaire (page 9) | Keep DOT 40.25(j) two-year pre-employment drug AND alcohol positive/refusal question; use a separate standalone consumer-report disclosure and authorization when applicable. |
| Blanket liability releases | Do not carry forward into the application or consumer-report disclosure. |
| Previous seven-day duty record, road test and evaluation | Move to onboarding/evaluator workflow. Applicant signature does not replace an actual road test or valid regulatory equivalent. |
| Contractor agreement, deductions, fines and operational rules | Separate from qualification application. Review actual operating practices, expense allocation, lawful deductions and worker classification before using. |
| PSP authorization | Optional screening; use current official disclosure text and distinct authorization if PSP is used. |
| Clearinghouse limited-query consent | Not a substitute for the mandatory pre-employment full query with driver consent inside Clearinghouse. Define duration for any separate limited-query authorization. |
| Sole-proprietor declaration | Do not use a preprinted assertion as proof of independent-contractor status. |

## Required application content and separate carrier duties

49 CFR 391.21 governs the application contents: carrier identity/address; applicant identity, DOB and SSN; three-year residences; date; all unexpired CMV licenses/permits; driving experience; three-year accidents and nonparking convictions/forfeitures; any license denial/revocation/suspension; work history; final regulatory certification, date and signature. Provide the prior-employer investigation notice and written review/correction/rebuttal rights before submission.

Carrier onboarding must separately cover MVR requests and prior-employer safety inquiries under 391.23, medical qualification verification, road test or permissible equivalent, pre-employment controlled-substances testing or documented exception, Clearinghouse full query, and the applicable ongoing qualification/testing obligations. The application alone is not a completed driver qualification file. Follow the applicable record-specific retention and restricted-access requirements.

## Contractor and compensation decisions

The business intends contractor arrangements for both categories. Contract labels and Forms 1099 do not decide status; actual control, financial arrangements and state-specific tests matter. Review company-provided equipment and dispatch/control practices in particular. Review Illinois unemployment-insurance classification separately from federal tax and wage law.

For covered USPS mail-haul contracts/subcontracts, SCA prevailing monetary wages and additional fringe benefits can apply to drivers including owner-operators regardless of contractor labels. Mileage/percentage payments must meet applicable hourly equivalents; account for all compensable work. Obtain the contract wage determination and fringe terms before finalizing compensation.

Before release, confirm mileage calculation (loaded/empty; practical/actual/other), rate range, percentage and its revenue basis, expenses/deductions, payment timing and benefits. Illinois pay-posting requirements may apply depending on actual employee count and coverage; an open-ended "$0.70+" is not sufficient when the law requires a good-faith range. Draft amount comes from the owner and remains unverified.

## Secure submission release requirements

- Select/configure secure onboarding or signing service and authorized reviewers; do not route SSNs to the existing general contact form or public GitHub.
- Implement structured repeatable address/employment/license/accident/violation entries; date coverage checks; explicit None options; conditional details; server-side validation and accessible errors. Current draft uses review-only text areas.
- Implement electronic-record consent (scope, paper alternative, withdrawal/contact procedures, access requirements), identity verification, intentional signature, timestamp, document version, immutable signed content and retrievable applicant copy under 390.32/E-SIGN.
- Restrict access, encrypt transport/storage, define retention/deletion and update applicant privacy notice. Do not add analytics or browser persistence to sensitive forms.
- Keep FCRA, PSP and Clearinghouse workflows separate. No fake success screen; show confirmation only after acknowledged secure receipt.
- Test mobile/keyboard flow, incomplete history, validation, signature refusal, duplicate submissions, service failure and signed-copy retrieval with synthetic data.

## Primary references

- Application: https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-391/subpart-C/section-391.21
- Safety-history investigation and rights: https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-391/subpart-C/section-391.23
- Electronic documents/signatures: https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-390/subpart-B/section-390.32
- DOT testing history: https://www.transportation.gov/odapc/part40/40-25
- Clearinghouse: https://clearinghouse.fmcsa.dot.gov/FAQ/Topics/queries-and-consent-requests
- Background reports: https://www.ftc.gov/business-guidance/resources/background-checks-what-employers-need-know
- Pre-offer medical inquiries: https://www.eeoc.gov/pre-employment-inquiries-and-medical-questions-examinations
- Annual violation certification repeal: https://www.govinfo.gov/content/pkg/FR-2022-03-09/html/2022-04930.htm
- IRS classification: https://www.irs.gov/businesses/small-businesses-self-employed/type-of-relationship
- Illinois classification: https://ides.illinois.gov/employer-resources/taxes-reporting/employee-misclassification.html
- USPS mail-haul compensation: https://www.dol.gov/agencies/whd/fact-sheets/67c-application-SCA-USPS
- Illinois pay transparency: https://labor.illinois.gov/faqs/equal-pay-act-salary-transparency-faq.html
- Illinois initial criminal inquiries: https://labor.illinois.gov/laws-rules/fls/job-opportunities-for-qualified-applicants-act.html

## Implementation update

The live hiring page links to https://five-falcons-driver-applications.willie-mccli-4907.chatgpt.site. The application portal uses Sites-authenticated accounts, server-side authorization, AES-GCM encrypted R2 storage, server validation, immutable signed snapshots, timestamps, consent evidence and downloadable HTML copies (printable to PDF). The reviewer inbox is restricted to the configured owner account. No email notifications are configured. The static apply.html now redirects to the portal. The portal is maintained in its own managed source repository; no applicant data is stored in this public repository.

Classification, final pay terms and separate screening/onboarding obligations remain operational responsibilities. Online qualification collection does not settle those matters.
