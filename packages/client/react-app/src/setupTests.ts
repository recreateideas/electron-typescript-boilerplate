import Enzyme, { shallow, render, mount } from 'enzyme';

/* React 16 Enzyme adapter */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

/* Make Enzyme functions available in all test files without importing */
Enzyme.configure({ adapter: new Adapter() });

window.shallow = shallow;
window.render = render;
window.mount = mount;
