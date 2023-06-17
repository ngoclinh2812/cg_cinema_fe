import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import Banner from '../../asset/images/cinema-banner.jpg';

const Advertisement = () => {
    return (
        <>
            <div className="w-full bg-gray-200 flex" style={{marginBottom: '30px'}}>
                <div className="w-1/2 p-8">
                    <h2 className="text-4xl font-bold text-center mb-6">Khuyến mãi</h2>
                    <p className="text-center mb-6">
                        Đăng ký để nhận nhiều ưu đãi vé xem phim. <br/>
                        Miễn phí combo bắp và nước đang chờ được bạn săn đón.
                    </p>
                    <Link to="/Register" className="flex justify-center">
                        <Button color="teal" ripple="light" rounded={true} size="lg">Đăng ký</Button>
                    </Link>
                </div>
                <div className="w-1/2 flex items-center justify-center overflow-hidden rounded-lg">
                    <img src={Banner} alt="Banner" className="max-w-full h-auto rounded-lg" style={{width: '500px'}}/>
                </div>
            </div>
        </>
    );
};

export default Advertisement;
