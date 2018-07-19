import Mousetrap from 'mousetrap';

import { dispatch } from './index';
import { FlipSelectedObject } from './actions';

Mousetrap.bind('f', () => dispatch(new FlipSelectedObject()));
