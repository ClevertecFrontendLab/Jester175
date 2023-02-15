import { user } from 'assets/images/user';
import { Rating } from 'components/card/rating';

import styles from './comment.module.css';

export const Comment = ({ comment }) => {
	const years = [
        'null',
		'январь',
		'февраль',
		'март',
		'апрель',
		'май',
		'июнь',
		'июль',
		'август',
		'сентябрь',
		'октябрь',
		'ноябрь',
		'декабрь',
	];

    const formatDate = () => {
        const localeDate = new Date(comment.createdAt).toLocaleDateString().split('.');
        const year = new Date(comment.createdAt).getFullYear();
        const day = localeDate[0];
        const month = years[localeDate[1].slice(1,2)]

        return `${day} ${month} ${year}`;
    }

	return (
		<div className={styles.user}>
			{}
			<div className={styles.reviewer}>
				<img
					src={comment?.user?.avatarUrl ? `https://strapi.cleverland.by${comment.user.avatarUrl}` : user}
					alt='Пользователь'
					className={styles.avatar}
				/>
				<div className={styles.contact}>
					<span className={styles.nickname}>{`${comment.user.firstName} ${comment.user.lastName}`}</span>
					<span className={styles.date}>{formatDate()}</span>
				</div>
			</div>
			<div className={styles.estimation}>
				<Rating length={Math.round(comment.rating) ?? 0} />
			</div>
			{!!comment.text && <p className={styles.descr}>{comment.text}</p>}
		</div>
	);
};
