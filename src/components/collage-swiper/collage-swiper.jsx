import { Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {v4} from 'uuid';

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
		className={book?.images?.length > 1 ? 'collage-swiper' : 'collage-swiper--hidden'}
	>
		{book?.images?.length > 1 &&
			book.images.map((img) => (
				<SwiperSlide key={v4()} data-test-id='slide-mini'>
					<button
						type='button'
						className='collage-swiper__btn'
						onClick={() => {
							setImage(img.url);
						}}
					>
						<img className='swiper__picture' src={`https://strapi.cleverland.by${img.url}`} alt='Обложка' />
					</button>
				</SwiperSlide>
			))}
	</Swiper>
);
