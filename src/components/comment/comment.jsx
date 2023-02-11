import { Rating } from 'components/card/rating';

import styles from './comment.module.css';

export const Comment = ({ book, user }) => (
	<div className={styles.user}>
		<div className={styles.reviewer}>
			<img src={user.avatar} alt='Пользователь' className={styles.avatar} />
			<div className={styles.contact}>
				<span className={styles.nickname}>{user.name}</span>
				<span className={styles.date}>{user.date}</span>
			</div>
		</div>
		<div className={styles.estimation}>
			<Rating length={book.estimate ?? 0} />
		</div>
		{!!user.comment && (
			<p className={styles.descr}>
				Учитывая ключевые сценарии поведения, курс на&nbsp;социально-ориентированный национальный проект
				не&nbsp;оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение
				современных методик предоставляет широкие возможности для позиций, занимаемых участниками в&nbsp;отношении
				поставленных задач. Как уже неоднократно упомянуто, сделанные на&nbsp;базе интернет-аналитики выводы будут
				в&nbsp;равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций&nbsp;&mdash; глубокий
				уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И&nbsp;нет сомнений, что
				акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в&nbsp;посмешище, хотя само
				их&nbsp;существование приносит несомненную пользу обществу.
			</p>
		)}
	</div>
);
