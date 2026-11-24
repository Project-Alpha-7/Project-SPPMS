# Testing and Acceptance Checklist

## Customer ordering
- [ ] The website opens from the QR code
- [ ] The product catalogue loads
- [ ] Each product shows the correct options
- [ ] Required fields are validated
- [ ] Supported files upload successfully
- [ ] Invalid file types are rejected
- [ ] The price estimate is correct for the agreed test cases
- [ ] Submitting creates exactly one order
- [ ] A unique Order ID is generated
- [ ] The confirmation page shows the correct order information

## Admin
- [ ] Admin login works, and admin and customer each land on the correct dashboard
- [ ] A customer can't open admin pages
- [ ] New orders appear in the admin list
- [ ] The admin can inspect specifications
- [ ] The admin can open uploaded artwork securely
- [ ] Confirm works
- [ ] A modification request works and the customer can see it
- [ ] Rejection requires a reason
- [ ] Status history records changes

## Production and tracking
- [ ] Stages appear in the correct order
- [ ] Only authorised roles can update stages
- [ ] Stage updates survive a refresh
- [ ] Admin changes appear on the customer side in real time
- [ ] Internal notes stay private
- [ ] The tracking token can't easily be guessed
- [ ] The QR opens the correct route on a phone

## Payment
- [ ] Pending, successful and failed states are handled
- [ ] A browser redirect alone can't mark a payment successful
- [ ] Duplicate payment events don't create duplicate records
- [ ] Manual payments are clearly marked as manually verified

## Optional modules
- [ ] Stock changes and threshold alerts work
- [ ] Machine values and maintenance rules display correctly and are labelled demo data

## Deployment
- [ ] Production env vars are configured securely
- [ ] Database access policies are enabled
- [ ] Artwork storage is protected
- [ ] Works on mobile, tablet and desktop
- [ ] The QR uses the final deployed URL. The live URL, DB and QR links work after deploy.
- [ ] Error states are understandable
- [ ] Demo data is clearly labelled
