import { useState } from 'react';
import { Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './collage-swiper.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const CollageSwiper = ({ book, setImage }) => (
	<Swiper
		data-test-id='slide-big'
		pagination={{ clickable: true }}
		spaceBetween={30}
        watchSlidesProgress = {true}
		modules={[Pagination, Scrollbar]}
		scrollbar={{ draggable: true }}
		breakpoints={{
			320: {
				slidesPerView: 1,
			},
			769: {
				slidesPerView: 'auto',
			},
		}}
		className={book.otherImage ? 'collage-swiper' : 'collage-swiper--hidden'}
	>
		{book.otherImage?.length >= 2 &&
			book.otherImage.map((img) => (
				<SwiperSlide data-test-id='slide-mini'>
					<button
						type='button'
						className='collage-swiper__btn'
						onClick={() => {
							setImage(img);
						}}
					>
						<img className='swiper__picture' src={img} alt='Обложка' />
					</button>
				</SwiperSlide>
			))}
	</Swiper>
);
