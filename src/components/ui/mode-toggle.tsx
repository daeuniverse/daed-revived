import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { useTheme } from '~/components/ui/theme-provider'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('actions.switchTheme')}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>{t('actions.lightMode')}</DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('dark')}>{t('actions.darkMode')}</DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('system')}>{t('actions.systemMode')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
