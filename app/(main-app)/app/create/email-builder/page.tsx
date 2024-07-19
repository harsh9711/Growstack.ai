import fs from "fs";
import Link from "next/link";
import path from "path";
import React from "react";
import "./styles/index.css";
// import "../../../../../public/builderjs/assets/css/font.css"
// import "../../../../../public/builderjs/assets/bootstrap-4.5.0/css/bootstrap.min.css";
import "../../../../../public/builderjs/assets/css/album.css";
import "../../../../../public/builderjs/assets/css/sample.css";

interface Template {
  id: string;
  title: string;
  thumb: string;
}

const getTemplates = (dir: string): Template[] => {
  const templateNames = fs.readdirSync(dir);
  return templateNames.map((name) => {
    const templatePath = path.join(dir, name);
    const indexFile = path.join(templatePath, "index.html");
    const thumb = fs.existsSync(path.join(templatePath, "thumb.svg"))
      ? `/builderjs/templates/${path.basename(dir)}/${name}/thumb.svg`
      : `/builderjs/templates/${path.basename(dir)}/${name}/thumb.png`;

    let title = "Untitled";
    if (fs.existsSync(indexFile)) {
      const content = fs.readFileSync(indexFile, "utf8");
      const match = content.match(/<title>([^<]*)<\/title>/);
      if (match) {
        title = match[1];
      }
    }

    return { id: name, title, thumb };
  });
};

const getTemplatesData = (): { featuredTemplates: Template[]; defaultTemplates: Template[]; customTemplates: Template[] } => {
  const featuredDir = path.join(process.cwd(), "public/builderjs/templates/featured");
  const defaultDir = path.join(process.cwd(), "public/builderjs/templates/default");
  const customDir = path.join(process.cwd(), "public/builderjs/templates/custom");

  const featuredTemplates = getTemplates(featuredDir);
  const defaultTemplates = getTemplates(defaultDir);
  const customTemplates = getTemplates(customDir);

  return {
    featuredTemplates,
    defaultTemplates,
    customTemplates,
  };
};

const Home: React.FC = () => {
  const { featuredTemplates, defaultTemplates, customTemplates } = getTemplatesData();

  return (
    <>
      <main role="main">
        <section className="album py-10 bg-light" id="example">
          <div className="container space-y-14">
            <div className="text-center space-y-2">
              <h2 className="font-weight-normal font-size-40">Getting started with a template</h2>
              <p className="">Start your design by choosing one of available layout templates that come with BuilderJS.</p>
            </div>
            <div className="grid grid-cols-4 gap-7">
              {featuredTemplates.map((template) => (
                <div key={template.id}>
                  <div className="rounded-xl overflow-hidden mb-4 shadow-md shadow-gray-300/50 bg-white group">
                    <Link href={`/app/create/email-builder/design?type=featured&id=${template.id}`}>
                      <img
                        width="100%"
                        height="100%"
                        className="group-hover:opacity-80 transition-all duration-300"
                        src={template.thumb}
                        title={template.title}
                        alt={template.title}
                      />
                    </Link>
                    <div className="py-5 px-6 space-y-1.5">
                      <h5 className="line-clamp-1 text-[17px]">{template.title}</h5>
                      <div className="text-[13px]">
                        <i> by </i>
                        <Link className="hover:underline cursor-pointer" href="javascript:;">
                          BuilderJS
                        </Link>
                        <span> at </span>
                        <Link className="hover:underline cursor-pointer" href="javascript:;">
                          SorrentoCorp
                        </Link>
                      </div>
                      <div className="!mt-5 flex justify-between items-center">
                        <Link
                          href={`/app/create/email-builder/design?type=featured&id=${template.id}`}
                          className="px-6 py-2 sheen rounded-lg bg-primary-green text-white">
                          Design
                        </Link>
                        <small className="">Featured</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="album py-10 bg-light" id="default">
          <div className="container space-y-14">
            <div className="text-center space-y-2">
              <h2 className="font-weight-normal font-size-40">Basic layouts</h2>
              <p className="">Start your design by choosing one of available layout templates that come with BuilderJS.</p>
            </div>
            <div className="grid grid-cols-4 gap-7">
              {defaultTemplates.map((template) => (
                <div key={template.id}>
                  <div className="rounded-xl overflow-hidden mb-4 shadow-md shadow-gray-300/50 bg-white group">
                    <Link href={`/app/create/email-builder/design?type=default&id=${template.id}`}>
                      <img
                        width="100%"
                        height="100%"
                        className="group-hover:opacity-80 transition-all duration-300"
                        src={template.thumb}
                        title={template.title}
                        alt={template.title}
                      />
                    </Link>
                    <div className="py-5 px-6 space-y-1.5">
                      <h5 className="line-clamp-1 text-[17px]">{template.title}</h5>
                      <div className="text-[13px]">
                        <i> by </i>
                        <Link className="hover:underline cursor-pointer" href="javascript:;">
                          BuilderJS
                        </Link>
                        <span> at </span>
                        <Link className="hover:underline cursor-pointer" href="javascript:;">
                          SorrentoCorp
                        </Link>
                      </div>
                      <div className="!mt-5 flex justify-between items-center">
                        <Link
                          href={`/app/create/email-builder/design?type=default&id=${template.id}`}
                          className="px-6 py-2 sheen rounded-lg bg-primary-green text-white">
                          Design
                        </Link>
                        <small className="">Default</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="album py-10 bg-light" id="custom">
          <div className="container space-y-14">
            <div className="text-center space-y-2">
              <h2 className="font-weight-normal font-size-40">Or upload your template and edit</h2>
              <p className="">If you already have an email or page template, just load it to the editor and start editing...</p>
            </div>
            <div className="grid grid-cols-4 gap-7">
              {customTemplates.map((template) => (
                <div key={template.id}>
                  <div className="rounded-xl overflow-hidden mb-4 shadow-md shadow-gray-300/50 bg-white group">
                    <Link href={`/app/create/email-builder/design?type=custom&id=${template.id}`}>
                      <img
                        width="100%"
                        height="100%"
                        className="group-hover:opacity-80 transition-all duration-300"
                        src={template.thumb}
                        title={template.title}
                        alt={template.title}
                      />
                    </Link>
                    <div className="py-5 px-6 space-y-1.5">
                      <h5 className="line-clamp-1 text-[17px]">{template.title}</h5>
                      <div className="text-[13px]">
                        <i> by </i>
                        <Link className="hover:underline cursor-pointer" href="javascript:;">
                          BuilderJS
                        </Link>
                        <span> at </span>
                        <Link className="hover:underline cursor-pointer" href="javascript:;">
                          SorrentoCorp
                        </Link>
                      </div>
                      <div className="!mt-5 flex justify-between items-center">
                        <Link
                          href={`/app/create/email-builder/design?type=custom&id=${template.id}`}
                          className="px-6 py-2 sheen rounded-lg bg-primary-green text-white">
                          Design
                        </Link>
                        <small className="">Custom</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
