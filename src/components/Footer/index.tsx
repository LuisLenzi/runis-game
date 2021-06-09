import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Footer() {
  return (
    <header className={styles.header}>
      <div className={styles.logoHeader}>
        <div className={styles.logoContent}>
          <img src="/assets/icons/headphone-icon.svg" alt="Uniscast" />
        </div>
        <div className={styles.headerMessage}>
          <p>Projeto desenvolvido com muito carinho e dedicação 🥰</p>
          <p>"A tecnologia move o mundo" - Steve Jobs</p>
        </div>
      </div>
    </header>
  );
}