import { selectThemeMode, setIsLoggedIn } from '@/app/app-slice'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme/theme'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import s from './Login.module.css'
import { loginInputs, loginSchema } from '../../lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLazyGetCaptchaQuery, useLoginMutation } from '@/features/auth/api/authApi'
import { ResultCode } from '@/common/Enums'
import { AUTH_TOKEN } from '@/common/constants'

export const Login = () => {
  const [loginMutation] = useLoginMutation()
  const [trigger, { data: captcha }] = useLazyGetCaptchaQuery()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  // const isLoggedIn = useAppSelector(selectIsLoggedIn)
  // const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<loginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false, captcha: undefined },
  })

  const onSubmit: SubmitHandler<loginInputs> = (data) => {
    loginMutation(data).then((res) => {
      if (res?.data?.resultCode === ResultCode.Success) {
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      if (res?.data?.resultCode === ResultCode.CaptchaError) {
        trigger()
      }
      reset()
    })
  }

  return (
    <Grid container justifyContent={'center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                href='https://social-network.samuraijs.com'
                target='_blank'
                rel='noreferrer'>
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label='Email' margin='normal' {...register('email')} error={!!errors.email} />
            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
            <TextField
              type='password'
              label='Password'
              margin='normal'
              {...register('password')}
              error={!!errors.password}
            />
            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label='Remember me'
              control={
                <Controller
                  name='rememberMe'
                  control={control}
                  render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                />
              }
            />
            {captcha && (
              <>
                <img src={captcha.url} alt='captcha' />
                <TextField
                  type='text'
                  label='captcha'
                  margin='normal'
                  {...register('captcha')}
                  error={!!errors.captcha}
                />
              </>
            )}
            <Button type='submit' variant='contained' color='primary'>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
