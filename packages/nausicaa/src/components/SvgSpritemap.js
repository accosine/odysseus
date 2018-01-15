import React from 'react';
import { styled } from 'styletron-react';

const SocialIcon = styled('symbol', {
  height: '8vw',
  padding: '2vw 0 2vw 1vw',
  width: '9vw',
  '@media screen and (min-width: 1024px)': {
    height: '2vw',
    padding: '1vw 0 1vw 1vw',
    width: '2vw',
  },
});

const LogoText = styled('symbol', {
  display: 'block',
  margin: '0 auto',
});

const OuterBubble = styled('path', {
  fill: 'none',
  stroke: '#000',
  strokeWidth: '1.16',
  strokeDasharray: '9.27999973,2.31999993,1.15999997,2.31999993',
});

const InnerBubble = styled('path', {
  fill: 'rgba(255, 255, 255, 0.7)',
  stroke: '#333',
  strokeWidth: '2.76',
});

export default () => {
  return (
    <svg
      width="0"
      height="0"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <SocialIcon id="social-icon--facebook-use" viewBox="0 0 1024 1024">
          <title>facebook</title>
          <path d="M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z" />
        </SocialIcon>
        <SocialIcon id="social-icon--whatsapp-use" viewBox="0 0 1024 1024">
          <title>whatsapp</title>
          <path d="M873 148.8c-95.8-96-223.2-148.8-359-148.8-279.6 0-507.2 227.6-507.2 507.4 0 89.4 23.4 176.8 67.8 253.6l-72 263 269-70.6c74.2 40.4 157.6 61.8 242.4 61.8h0.2c0 0 0 0 0 0 279.6 0 507.4-227.6 507.4-507.4 0-135.6-52.8-263-148.6-359zM514.2 929.6v0c-75.8 0-150-20.4-214.8-58.8l-15.4-9.2-159.6 41.8 42.6-155.6-10-16c-42.4-67-64.6-144.6-64.6-224.4 0-232.6 189.2-421.8 422-421.8 112.6 0 218.6 44 298.2 123.6 79.6 79.8 123.4 185.6 123.4 298.4-0.2 232.8-189.4 422-421.8 422zM745.4 613.6c-12.6-6.4-75-37-86.6-41.2s-20-6.4-28.6 6.4c-8.4 12.6-32.8 41.2-40.2 49.8-7.4 8.4-14.8 9.6-27.4 3.2s-53.6-19.8-102-63c-37.6-33.6-63.2-75.2-70.6-87.8s-0.8-19.6 5.6-25.8c5.8-5.6 12.6-14.8 19-22.2s8.4-12.6 12.6-21.2c4.2-8.4 2.2-15.8-1-22.2s-28.6-68.8-39-94.2c-10.2-24.8-20.8-21.4-28.6-21.8-7.4-0.4-15.8-0.4-24.2-0.4s-22.2 3.2-33.8 15.8c-11.6 12.6-44.4 43.4-44.4 105.8s45.4 122.6 51.8 131.2c6.4 8.4 89.4 136.6 216.6 191.4 30.2 13 53.8 20.8 72.2 26.8 30.4 9.6 58 8.2 79.8 5 24.4-3.6 75-30.6 85.6-60.2s10.6-55 7.4-60.2c-3-5.6-11.4-8.8-24.2-15.2z" />
        </SocialIcon>
        <SocialIcon id="social-icon--twitter-use" viewBox="0 0 1024 1024">
          <title>twitter</title>
          <path d="M1024 226.4c-37.6 16.8-78.2 28-120.6 33 43.4-26 76.6-67.2 92.4-116.2-40.6 24-85.6 41.6-133.4 51-38.4-40.8-93-66.2-153.4-66.2-116 0-210 94-210 210 0 16.4 1.8 32.4 5.4 47.8-174.6-8.8-329.4-92.4-433-219.6-18 31-28.4 67.2-28.4 105.6 0 72.8 37 137.2 93.4 174.8-34.4-1-66.8-10.6-95.2-26.2 0 0.8 0 1.8 0 2.6 0 101.8 72.4 186.8 168.6 206-17.6 4.8-36.2 7.4-55.4 7.4-13.6 0-26.6-1.4-39.6-3.8 26.8 83.4 104.4 144.2 196.2 146-72 56.4-162.4 90-261 90-17 0-33.6-1-50.2-3 93.2 59.8 203.6 94.4 322.2 94.4 386.4 0 597.8-320.2 597.8-597.8 0-9.2-0.2-18.2-0.6-27.2 41-29.4 76.6-66.4 104.8-108.6z" />
        </SocialIcon>
        <LogoText id="nausika--logotext-use" viewBox="0 0 157 86">
          <title>nausika</title>
          <path d="M104.43 20.668c-.124 8.83-.242 16.688-.376 24.968-7.867 13.075-10.546 6.672-8.968-3.594.575-1.67-1.424-2.482-1.875-.812a49.234 49.234 0 0 0-.437 5c-1.607 3.157-4.497 7.21-8.564 6.982 1.597-.992 2.202-2.92 1.75-4.685.172-1.534-2.187-4.336-3.093-7.047.623-5.953-3.127-4.033-2.03.156-2.726 10.5-11.555 17.123-9.876 1.312.183-1.27-1.363-1.648-1.843-.53-.585 2.494-.244 5.574-1.313 7.53-.546 1.878-4.59 3.585-5.28.28-.533-2.716.315-5.11 1.687-7.217.774-.96-.494-2.33-1.406-1.374-.946 1.133-1.466 2.516-1.843 3.937-2.615 5.566-7.238 10.404-8.75 3.5.347-3.54-2.243-3.977-2.28-1.062-7.628 14.44-8.382-9.24 1.593-3.812.8.885 2.24-.417 1.438-1.313-3.282-3.562-8.208-1.153-10.03 2.625-12.53 17.314-5.29-2.968-9.476-3.33-3.498-2.08-7.418 7.104-8.706 9.346-.402-3.71 1.175-7.947.056-9.734-3.425-5.477-7.416 8.184-4.514 4.916 7.05-14.034-1.67 13.746 5.733 6.46.724-.715 1.76-4.323 4.05-7.21 7.792-10.324-3.633 19.15 12.203 4.6 1.234 6.927 6.075 4.777 8.466.484 2.15 5.684 7.54 2.86 9.812-.875 1.217 5.455 5.908 4.783 8.75.906 4.732 8.593 11.435-2.38 12.782-6.688 3.47 4.958 1.872 9.606-1.844 6.97-.67-.872-1.857.023-1.563 1 4.748 5.255 11.13 2.086 14.093-2.407 1.94 8.253 8.056 4.64 11.22-.375-.02 1.26-.045 2.383-.064 3.687-.44 1.614 2.418 2.253 2.863.575 2.016-15.97 13.086-10.97 4.824-5.418-8.423 5.66 5.652 9.908 10.344 1.906.355 2.405 2.293 3.93 4.032 3.937 2.04.022 3.72-1.985 4.704-3.41 1.922 5.98 8.62 2.714 8.077.692-.498-1.858-5.073 4.325-6.625-2.47.535-3.417-2.086-4.225-2.28-1.062-7.87 13.006-8.248-9.297 1.735-4.003.8.886 2.098-.227 1.295-1.122-3.16-3.372-8.31-1.104-10.03 2.594-2.998 5.906-8.28 10.05-12.117 5.38 8.982-2.585 6.317-12.76-.12-9.226-2.6 1.774-3.725 4.938-4.7 7.814.105-9.98.288-17.958.437-27.938-.174-1.77-1.26-1.98-1.938-.842zm-9.72 10.625c-.933-.05-1.904.44-2.28 1.343-.68 1.307.175 3.128 1.656 3.344 1.403.337 2.873-.868 2.812-2.312-.156-1.474-1.005-1.983-2.187-2.375zm-.25 1.5c.715.008.8.544 1 .875.01.837-1.21 1.203-1.656.468-.448-.696.082-1.25.657-1.343z" />
        </LogoText>
        <symbol id="nausika--bubble-use" viewBox="0 0 157 86">
          <title>nausika-bubbles</title>
          <OuterBubble d="M82.973.714C55.417 1.59 25.126 9.5 7.566 32.184c-7.122 9.12-10.047 24.554-.062 32.75 12.354 9.138 28.724 9.52 43.464 11.504 19.646 2.386 39.453 2.03 59.16 1.14 7.98-.102 15.774 3.02 22.032 7.636 7.862 1.064 13.577-6.512 18.125-11.844 9.653-14.56 5.775-34.304-3.02-48.272C137.16 9.034 117.996 2.286 99.858 1.15 94.242.72 88.602.63 82.973.715z" />
          <InnerBubble d="M133.958 79.7c-6.795-7.32-20.047-8.543-31.69-7.988-10.753.284-21.79 1.622-32.228-.11-19.077-.877-39.5-1.77-55.642-9.145-8-3.53-9.05-13.093-5.528-20.356 4.944-10.755 15.752-20.373 28.923-25.68 21.823-9.58 45.645-11.762 69.753-8.242 17.197 2.4 31.184 11.71 36.794 23.77 3.608 7.543 5.29 15.686 5.595 23.844-.047 8.94-5.418 18.458-15.977 23.91z" />
        </symbol>
      </defs>
    </svg>
  );
};
