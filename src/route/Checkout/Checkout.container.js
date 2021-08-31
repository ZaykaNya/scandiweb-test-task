import { connect } from 'react-redux';

import {
    mapStateToProps as sourceMapStateToProps,
    mapDispatchToProps as sourceMapDispatchToProps,
    CheckoutContainer as SourceCheckoutContainer,
} from 'SourceRoute/Checkout/Checkout.container';

export const mapStateToProps = state => ({
    ...sourceMapStateToProps(state),
    // TODO extend mapStateToProps
});

export const mapDispatchToProps = dispatch => ({
    ...sourceMapDispatchToProps(dispatch),
    // TODO extend mapDispatchToProps
});

export class CheckoutContainer extends SourceCheckoutContainer {
    // TODO implement logic
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
