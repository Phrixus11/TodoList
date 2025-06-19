import { Link } from "react-router"
import styles from "./PageNotFound.module.css"
import Button from '@mui/material/Button'

export const PageNotFound = () => (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>page not found</h2>
      <Button component={Link} to="/" size={'large'} color={'primary'} disableElevation variant={'contained'}>Вернуться на главную страницу</Button>
    </div>
)