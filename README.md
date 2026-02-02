# Solar Haven - Funnel Website

A professional conversion-optimized funnel website for Solar Haven, offering Solar, Battery & Air Conditioning solutions in Queensland, Australia.

## Files Structure
```
Funnel_White/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Form handling & interactions
├── logo/
│   └── logo.png        # Company logo
└── README.md           # This file
```

## How to Deploy

### Option 1: Netlify (Easiest - Recommended)
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up for free account
3. Drag and drop this entire folder onto Netlify
4. Your site is live instantly!

### Option 2: GitHub Pages
1. Create account at [github.com](https://www.github.com)
2. Create new repository
3. Upload all files
4. Go to Settings → Pages → Enable GitHub Pages
5. Your site will be at: `https://yourusername.github.io/repository-name`

### Option 3: Vercel
1. Go to [vercel.com](https://www.vercel.com)
2. Sign up for free
3. Import project folder
4. Deploy instantly

### Option 4: Traditional Hosting
- Upload all files via FTP to your web hosting provider
- Ensure `index.html` is in the root directory
- Make sure logo folder is uploaded with the logo.png file

## Customization

### Update Form Submission
Edit `script.js` and update the `submitForm()` function to connect to your backend API:

```javascript
fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
```

### Update Contact Information
Edit `index.html` to update any contact details or company information.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
© 2024 Solar Haven. All rights reserved.

