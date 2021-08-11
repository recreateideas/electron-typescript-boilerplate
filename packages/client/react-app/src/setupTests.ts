import Enzyme, { shallow, render, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

expect.extend({ toMatchImageSnapshot });
//@ts-ignore
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

window.shallow = shallow;
window.render = render;
window.mount = mount;
