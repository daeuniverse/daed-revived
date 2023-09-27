import i18n from 'i18next'
import { useAtom } from 'jotai'
import {
  ActivityIcon,
  AlarmClockIcon,
  AlbumIcon,
  LanguagesIcon,
  Loader2Icon
} from 'lucide-react'
import { FC } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { endpointInfoAtom } from '~/atoms'
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
import { HomePage } from '~/pages/HomePage'
import { SetupPage } from '~/pages/SetupPage'

const EndpointInfoRequiredRoute: FC = () => {
  const [endpointInfo] = useAtom(endpointInfoAtom)

  if (!endpointInfo.endpointURL || !endpointInfo.token) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2Icon className="h-auto w-1/12 animate-spin" />
      </div>
    )
  }

  return <Outlet />
}

export const App = () => {
  return (
    <div className="container relative flex h-screen flex-col">
      <div className="sticky inset-x-0 top-0 flex items-center justify-between py-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <ActivityIcon className="h-4 w-4" />
                  </NavigationMenuLink>
                </TooltipTrigger>

                <TooltipContent>Activity</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <AlbumIcon className="h-4 w-4" />
                  </NavigationMenuLink>
                </TooltipTrigger>

                <TooltipContent>hello world</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <AlarmClockIcon className="h-4 w-4" />
                  </NavigationMenuLink>
                </TooltipTrigger>

                <TooltipContent>hello world</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    onClick={() =>
                      void i18n.changeLanguage(
                        i18n.language === 'en-US' ? 'zh-Hans' : 'en-US'
                      )
                    }
                  >
                    <LanguagesIcon className="h-4 w-4" />
                  </NavigationMenuLink>
                </TooltipTrigger>

                <TooltipContent>Switch Language</TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ModeToggle />
      </div>

      <div className="box-border flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route element={<EndpointInfoRequiredRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route path="/setup" element={<SetupPage />} />
        </Routes>
      </div>
    </div>
  )
}
