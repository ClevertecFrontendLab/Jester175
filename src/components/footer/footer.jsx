import { fb, inst, vk, linkedin } from '../../assets/images/footer';

import styles from './footer.module.css';

export const Footer = () => (
	<footer className={styles.section}>
		<div className={styles.container}>
			<div className={styles.footer}>
				<p className={styles.copyright}>&copy;&nbsp;2020-2023&nbsp;Cleverland. Все права защищены.</p>
				<div className={styles.social}>
					<img src={fb} alt='Вк' className={styles.icon} />
					<img src={inst} alt='Инстаграм' className={styles.icon} />
					<img src={vk} alt='Линкидин' className={styles.icon} />
					<img src={linkedin} alt='Фейсбук' className={styles.icon} />
				</div>
			</div>
		</div>
	</footer>
);
