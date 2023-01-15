import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToaster, setToasterVisibility } from '../Redux/toasterSlice';
import { connect } from 'react-redux';

function Toaster(props) {
    const { toaster, toasterVisible, setToaster, setToasterVisibility } = props;
    useEffect(() => {
        if (toaster) {
            setToasterVisibility(true);
            setTimeout(() => {
                setToasterVisibility(false);
            }, 5000);
        }
        console.log("Toaster has been Displayed")
    }, [toaster, setToasterVisibility]);

    return (
        <div>
            {toasterVisible && (
                <div className="fixed top-24 right-0 p-4 z-50">
                    <div className="bg-green-500 text-white p-2 rounded-md">
                        {toaster}
                    </div>
                </div>
            )}
        </div>
    );
}
const mapStateToProps = state => ({
    toaster: state.toaster,
    toasterVisible: state.toasterVisible
})
const mapDispatchToProps = {
    setToaster,
    setToasterVisibility
}
export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
