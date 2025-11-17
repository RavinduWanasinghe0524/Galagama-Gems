# Login Page Documentation

## Overview
A beautiful, matching login page has been created for the Galagama Gems website with elegant animations and the same visual design as the home page.

## Features

### Visual Design
- **Matching Background**: Same parallax Ken Burns effect with the jewelry background image
- **Glass-morphism Card**: Semi-transparent login form with backdrop blur
- **Elegant Typography**: Uses the Playfair Display font to match the brand identity
- **Gradient Accents**: Amber to yellow gradient buttons matching the site theme

### Animations
- **Smooth Entry**: Login form fades and slides in gracefully
- **Hover Effects**: Interactive buttons with scale animations
- **Focus States**: Input fields highlight with amber glow on focus
- **Parallax Background**: Background scrolls at different speed for depth

### Form Elements
1. **Email Input**: Required field with placeholder and validation
2. **Password Input**: Secure password field
3. **Remember Me**: Checkbox option for persistent login
4. **Forgot Password**: Link to password recovery
5. **Submit Button**: Prominent gradient button with hover effects
6. **Social Login**: Google and GitHub OAuth buttons
7. **Sign Up Link**: Link to registration page

## How to Access

### From Navigation
Click the "Login" button in the top navigation bar of the home page.

### Direct URL
Navigate to: `http://localhost:3000/#login`

### From Home Page
Navigate back by clicking the logo or visiting: `http://localhost:3000/`

## Technical Details

### Component Location
- File: `src/components/Login.tsx`
- Integrated into: `src/App.tsx`

### Styling
- Uses Tailwind CSS utility classes
- Custom glassmorphism effects with `bg-white/10` and `backdrop-blur-sm`
- Consistent color scheme with amber (#FBB040) and yellow accents
- White text with opacity variants for hierarchy

### Responsive Design
- Centered login card with max-width constraint
- Mobile-friendly form layout
- Proper spacing and touch targets

### State Management
- React hooks for form state (email, password)
- Loading animations with `isLoaded` state
- Form validation on submit

## Customization

### Change Background Image
Edit line 66 in `Login.tsx`:
```tsx
backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('YOUR_IMAGE_URL')`
```

### Modify Colors
Update the gradient colors in the submit button (line 191):
```tsx
className="... bg-gradient-to-r from-amber-400 to-yellow-600 ..."
```

### Add Form Validation
Enhance the `handleSubmit` function (line 23) with your validation logic.

### Connect to Backend
Replace the console.log in `handleSubmit` with your authentication API call:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Add your API call here
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
};
```

## Design Philosophy
The login page maintains perfect visual consistency with the main website:
- Same elegant serif typography
- Identical parallax background effects
- Matching color palette and gradients
- Consistent spacing and layout rhythm
- Seamless navigation experience

## Browser Support
- Modern browsers with CSS backdrop-filter support
- Framer Motion animation library for smooth transitions
- Responsive across all device sizes
