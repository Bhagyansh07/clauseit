# Privacy

ClauseIt reads documents that can contain sensitive personal and financial
information (loan agreements, insurance policies, rent contracts, job offers).
This page explains, in plain language, what happens to your data.

## What we process

When you upload a document, the file is sent to the ClauseIt server, where its
text is extracted and sent to Google's Gemini API for analysis. The analysis
(language, summary, clauses, charges, dates, risk score) is what the app shows
you.

## What we store

- **By default we do not keep your original file.** The uploaded bytes are
  processed and then discarded; only the extracted analysis is retained.
- For **signed-in** users, the analysis is saved to your account so it appears
  in your dashboard and can be shared by link.
- Guest analyses are not saved to an account.

## Third parties

- **Google Gemini** processes the document text to produce the analysis.
- **Supabase** stores account data and, for signed-in users, the saved
  analyses, protected by Row Level Security (users can only read their own rows).
- **Vercel** hosts the application.

## Sharing

Share links are read-only and token-based. Anyone with the link can view the
shared analysis until it is removed by the owner.

## Your choices

- Do not start a free plan if you are not comfortable with the processing above.
- Signed-in users can delete a saved analysis from their dashboard.
- Do not upload documents you are not permitted to share with the processors
  listed above.

## Contact

Open an issue or use the contact method on the site. This is an early-stage
product; the policy above will be expanded as the product matures.
