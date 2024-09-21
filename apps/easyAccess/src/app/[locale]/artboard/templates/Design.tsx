// import { TemplateProps } from "../types/template";
import * as Avatar from '@radix-ui/react-avatar';
import { MattsIcon } from "../components/mattsIcon";
import { useArtboardStore } from "apps/easyAccess/src/store/artboard";
import { cn } from '@easy-access/utils';

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);
  const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);
  return (
    <div className="flex flex-col items-start space-y-4 text-left">
      <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <Avatar.Fallback
          className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={600}
        >
          CT
        </Avatar.Fallback>
      </Avatar.Root>

      <div className="space-y-4">
        <div>
          <div className="text-2xl font-bold">{basics.name}</div>
          <div className="text-base mt-2">{basics.headline}</div>
        </div>

        <div className="flex flex-row item-center w-[142px] pt-6">
          <MattsIcon
            color={primaryColor}
            colNum={6}
            rowNum={6}
            offset='3px 2px'
            renderText={() => {
              return (
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="5.8299560546875" height="4.58001708984375" viewBox="0 0 5.8299560546875 4.58001708984375" fill="none">
                  <path d="M1.30644 4.58C1.99234 4.58 2.49856 4.07487 2.49856 3.46866C2.49856 2.79513 2.05764 2.34052 1.40445 2.34052C1.24115 2.34052 1.1105 2.40789 1.07779 2.4247C1.1105 1.70065 1.84537 1.04397 2.49856 0.926122L2.49856 0C1.5351 0.101035 0 0.94293 0 3.04772C0 3.97384 0.555249 4.58 1.30644 4.58ZM5.83 0C4.86648 0.101035 3.33144 0.94293 3.33144 3.04772C3.33144 3.97384 3.88669 4.58 4.63788 4.58C5.32378 4.58 5.83 4.07487 5.83 3.46866C5.83 2.79513 5.38908 2.34052 4.73583 2.34052C4.57253 2.34052 4.44188 2.40789 4.40923 2.4247C4.44188 1.70065 5.17681 1.04397 5.83 0.926122L5.83 0Z" fillRule="evenodd" fill="#79819A" >
                  </path>
                </svg>
              )
            }}
          />

          <div className="leading-none px-2 text-sm">
            <span className="text-justify">People ignore design that ignore people.</span>

            <p className="text-xs color-violet11 leading-1 mt-2">Frank Kimero</p>
          </div>

          <MattsIcon
            color={primaryColor}
            colNum={5}
            rowNum={10}
            offset='13px 2px'
            renderText={() => {
              return (
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="5.8299560546875" height="4.58001708984375" viewBox="0 0 5.8299560546875 4.58001708984375" fill="none">
                  <path d="M4.75221 2.1553C4.7195 2.87935 3.98463 3.53603 3.33144 3.65388L3.33144 4.58C4.2949 4.47897 5.83 3.63707 5.83 1.53228C5.83 0.606163 5.27475 0 4.52356 0C3.83766 0 3.33144 0.505128 3.33144 1.11134C3.33144 1.78487 3.77236 2.23948 4.42555 2.23948C4.58885 2.23948 4.7195 2.17211 4.75221 2.1553ZM0 3.65388L0 4.58C0.963524 4.47897 2.49856 3.63707 2.49856 1.53228C2.49856 0.606163 1.94331 0 1.19212 0C0.506219 0 0 0.505128 0 1.11134C0 1.78487 0.440923 2.23948 1.09417 2.23948C1.25747 2.23948 1.38812 2.17211 1.42077 2.1553C1.38812 2.87935 0.653193 3.53603 0 3.65388Z" fillRule="evenodd" fill="#79819A" >
                  </path>
                </svg>

              )
            }}
          />

        </div>


        <div className="flex flex-col items-start py-4 text-left text-sm gap-y-4">
          {basics.email && (
            <div className="flex items-center gap-x-4">
              <div className="rounded-full p-custom bg-[#E2E6EE] w-3 h-3 flex items-center justify-center">
                <i className="ph ph-bold ph-at text-primary" />
              </div>
              <div className="flex flex-col">
                Email
                <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                  {basics.email}
                </a>
              </div>
            </div>
          )}
          {basics.location && (
            <div className="flex items-center gap-x-4">
              <div className="rounded-full p-custom bg-[#E2E6EE] w-3 h-3 flex items-center justify-center">
                <i className="ph ph-bold ph-map-pin text-primary" />
              </div>
              <div className="flex flex-col">
                Location
                <div>{basics.location}</div>
              </div>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-x-4">
              <div className="rounded-full p-custom bg-[#E2E6EE] w-3 h-3 flex items-center justify-center">
                <i className="ph ph-bold ph-phone text-primary" />
              </div>
              <div className="flex flex-col">
                Phone
                <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                  {basics.phone}
                </a>
              </div>
            </div>
          )}
          {/* <Link url={basics.url} /> */}

          {
            basics.url && (
              <div className="flex items-center gap-x-4">
                <div className="rounded-full p-custom bg-[#E2E6EE] w-3 h-3 flex items-center justify-center">
                  <i className="ph ph-bold ph-link text-primary group-[.sidebar]:text-primary" />
                </div>
                <div className="flex flex-col">
                  Url
                  <a
                    href={basics.url.href}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    className={cn("inline-block")}
                  >
                    {basics.url.label || basics.url.href}
                  </a>
                </div>
              </div>
            )
          }

          {basics.customFields.map((item) => (
            <div key={item.id} className="flex items-center gap-x-4">
              <div className="rounded-full p-custom bg-[#E2E6EE] w-3 h-3 flex items-center justify-center">
                <i className={cn(`ph ph-bold ph-${item.icon} text-primary`)} />
              </div>
              <div className="flex flex-col">
                {item.name}
                <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Design = ({ columns, isFirstPage = false }: any) => {
  const [main, sidebar] = columns;


  return (
    <div className="grid min-h-[inherit] grid-cols-4">
      <div
        className="sidebar p-custom group space-y-4"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {isFirstPage && <Header />}

        sidebar
      </div>

      <div className="main p-custom group col-span-3">
      main
      </div>
    </div>
  );
};
