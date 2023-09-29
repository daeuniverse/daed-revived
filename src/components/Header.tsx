import i18n from 'i18next'
import { ActivityIcon, AlbumIcon, CogIcon, LanguagesIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import { ModeToggle } from '~/components/ui/mode-toggle'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '~/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '~/components/ui/tooltip'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      <div className="hidden w-1/2 sm:block">
        <h1 className="justify-start bg-gradient-to-br from-amber-500 to-primary bg-clip-text text-2xl font-bold text-transparent">
          <a
            href="https://github.com/daeuniverse/daed"
            target="_blank"
            rel="noreferrer"
          >
            daed
          </a>
        </h1>
      </div>

      <div className="flex-shrink-0">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-center gap-2 space-x-0 sm:gap-6">
            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    className={navigationMenuTriggerStyle()}
                    to="/orchestrate"
                  >
                    <NavigationMenuLink asChild>
                      <ActivityIcon className="h-4 w-4" />
                    </NavigationMenuLink>
                  </Link>
                </TooltipTrigger>

                <TooltipContent>Orchestrate</TooltipContent>
              </Tooltip>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger>
                  <Link className={navigationMenuTriggerStyle()} to="/routing">
                    <NavigationMenuLink asChild>
                      <AlbumIcon className="h-4 w-4" />
                    </NavigationMenuLink>
                  </Link>
                </TooltipTrigger>

                <TooltipContent>Routing</TooltipContent>
              </Tooltip>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger>
                  <Link className={navigationMenuTriggerStyle()} to="/dns">
                    <NavigationMenuLink asChild>
                      <ActivityIcon className="h-4 w-4" />
                    </NavigationMenuLink>
                  </Link>
                </TooltipTrigger>

                <TooltipContent>DNS</TooltipContent>
              </Tooltip>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger>
                  <Link className={navigationMenuTriggerStyle()} to="/config">
                    <NavigationMenuLink asChild>
                      <CogIcon className="h-4 w-4" />
                    </NavigationMenuLink>
                  </Link>
                </TooltipTrigger>

                <TooltipContent>Config</TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="inline-flex w-1/2 justify-end gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                void i18n.changeLanguage(
                  i18n.language === 'en-US' ? 'zh-Hans' : 'en-US'
                )
              }
            >
              <LanguagesIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t('actions.switchLanguage')}</TooltipContent>
        </Tooltip>

        <ModeToggle />
      </div>
    </div>
  )
}
