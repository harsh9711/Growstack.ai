import React from "react";
import Link from "next/link";
import Head from "next/head";
import fs from "fs";
import path from "path";
import "./styles/index.css";
// import "../../../../../public/assets/css/font.css"
import "../../../../../public/assets/bootstrap-4.5.0/css/bootstrap.min.css";
import "../../../../../public/assets/css/sample.css";
import "../../../../../public/assets/css/album.css";

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
      ? `/templates/${path.basename(dir)}/${name}/thumb.svg`
      : `/templates/${path.basename(dir)}/${name}/thumb.png`;

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
  const featuredDir = path.join(process.cwd(), "public/templates/featured");
  const defaultDir = path.join(process.cwd(), "public/templates/default");
  const customDir = path.join(process.cwd(), "public/templates/custom");

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
      <Head>
        <title>BuilderJS · Home</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/fav/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/fav/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/fav/favicon-16x16.png" />
        <link rel="manifest" href="/assets/fav/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script src="/assets/js/jquery-3.5.1.min.js"></script>
      </Head>

      <main role="main">
        <section className="album py-5 bg-light" id="example">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="font-weight-normal font-size-40">Getting started with a template</h2>
              <p className="text-muted">Select one of our professionally-designed templates to get started quickly.</p>
            </div>
            <div className="row">
              {featuredTemplates.map((template) => (
                <div className="col-md-3" key={template.id}>
                  <div className="card mb-4 shadow-sm">
                    <Link href={`/app/create/email-builder/design?type=featured&id=${template.id}`}>
                      <img width="100%" height="100%" className="_1xvs1" src={template.thumb} title={template.title} alt={template.title} />
                    </Link>
                    <div className="card-body">
                      <h5>{template.title}</h5>
                      <div className="JHf2a mb-4 small text-muted item-desc">
                        <i> by </i>
                        <Link className="R8zaM" href="javascript:;">
                          BuilderJS
                        </Link>
                        <span> at </span>
                        <Link className="R8zaM" href="javascript:;">
                          SorrentoCorp
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link href={`/app/create/email-builder/design?type=featured&id=${template.id}`} className="btn btn-sm btn-primary">
                            Design
                          </Link>
                        </div>
                        <small className="text-muted">Featured</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="album py-5 bg-light" id="default">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="font-weight-normal font-size-40">Default Templates</h2>
              <p className="text-muted">Basic templates to start your design journey.</p>
            </div>
            <div className="row">
              {defaultTemplates.map((template) => (
                <div className="col-md-3" key={template.id}>
                  <div className="card mb-4 shadow-sm">
                    <Link href={`/app/create/email-builder/design?type=default&id=${template.id}`}>
                      <img width="100%" height="100%" className="_1xvs1" src={template.thumb} title={template.title} alt={template.title} />
                    </Link>
                    <div className="card-body">
                      <h5>{template.title}</h5>
                      <div className="JHf2a mb-4 small text-muted item-desc">
                        <i> by </i>
                        <Link className="R8zaM" href="javascript:;">
                          BuilderJS
                        </Link>
                        <span> at </span>
                        <Link className="R8zaM" href="javascript:;">
                          SorrentoCorp
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link href={`/app/create/email-builder/design?type=default&id=${template.id}`} className="btn btn-sm btn-primary">
                            Design
                          </Link>
                        </div>
                        <small className="text-muted">Default</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="album py-5 bg-light" id="custom">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="font-weight-normal font-size-40">Custom Templates</h2>
              <p className="text-muted">Templates created and customized by users.</p>
            </div>
            <div className="row">
              {customTemplates.map((template) => (
                <div className="col-md-3" key={template.id}>
                  <div className="card mb-4 shadow-sm">
                    <Link href={`/app/create/email-builder/design?type=custom&id=${template.id}`}>
                      <img width="100%" height="100%" className="_1xvs1" src={template.thumb} title={template.title} alt={template.title} />
                    </Link>
                    <div className="card-body">
                      <h5>{template.title}</h5>
                      <div className="JHf2a mb-4 small text-muted item-desc">
                        <i> by </i>
                        <Link className="R8zaM" href="javascript:;">
                          BuilderJS
                        </Link>
                        <span> at </span>
                        <Link className="R8zaM" href="javascript:;">
                          SorrentoCorp
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link href={`/app/create/email-builder/design?type=custom&id=${template.id}`} className="btn btn-sm btn-primary">
                            Design
                          </Link>
                        </div>
                        <small className="text-muted">Custom</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="text-muted">
        <div className="container">
          <p className="float-right">
            <Link href="javascript:;">Back to top</Link>
          </p>
          <p>© 2022 Sorrento Corp. Trademarks and brands are the property of their respective owners.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
