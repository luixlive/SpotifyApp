import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Enzyme adapter
configure({ adapter: new Adapter() });

// Mock no-mobile device dimensions
global.innerWidth = 800;
