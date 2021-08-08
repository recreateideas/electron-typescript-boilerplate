import PropTypes from 'prop-types';
import Spinner from 'react-spinner-material';
import { Container, Message } from './styledComponents';

interface Iprops {
    color: string;
    freeze?: boolean;
    message?: string;
}
export const Loader = (props: Iprops) => {
    const { color, freeze, message } = props;
    return (
        <Container className="loader" {...{ freeze }}>
            <Spinner {...{ radius: 40, color, stroke: 5, visible: true }} />
            {message && <Message>{message}</Message>}
        </Container>
    );
};

Loader.displayName = 'Loader';

Loader.defaultProps = {
    color: 'orange',
};

Loader.propTypes = {
    color: PropTypes.string,
    message: PropTypes.string,
};
