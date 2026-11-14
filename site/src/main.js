import { mount } from 'svelte';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import './app.css';
import App from './App.svelte';

mount(App, { target: document.getElementById('app') });
