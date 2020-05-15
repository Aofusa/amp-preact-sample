import * as React from "preact";
import { render } from "preact";
import { useState } from "preact/hooks";

window.requestAnimationFrame = (_cb): number => 0;
window.cancelAnimationFrame = (_cb): number => 0;

type AMPImgProps = {
  src?: string;
  width?: string;
  height?: string;
  layout?: string;
  alt?: string;
  className?: string;
};

const AMPImgContent: React.FunctionComponent<AMPImgProps> = (props) => {
  return React.createElement("amp-img", props, null);
};

type ArticleContentTemplateProps = {
  src: string;
  width: string;
  height: string;
  alt: string;
  header: string;
  subject: string;
  body: string;
};

const ArticleContentTemplate: React.FunctionComponent<ArticleContentTemplateProps> = (
  props
) => {
  return (
    <section className="ampstart-related-article-section p3 mb4 border-top border-bottom">
      <h2 className="ampstart-heading ampstart-label m0 mb3">{props.header}</h2>
      <article className="ampstart-related-article">
        <AMPImgContent
          src={props.src}
          width={props.width}
          height={props.height}
          layout="responsive"
          alt={props.alt}
          className="mb3"
        ></AMPImgContent>
        <h3 className="ampstart-heading h4 m0 mb3">{props.subject}</h3>
        <p className="line-height-4 mb3">{props.body}</p>
        <a
          href="#"
          className="ampstart-related-article-readmore block text-decoration-none ampstart-label"
        >
          Read more
        </a>
      </article>
    </section>
  );
};

type FetchContentProps = {
  urlList: Array<string>;
};

const FetchContent: React.FunctionComponent<FetchContentProps> = (props) => {
  return (
    <div>
      {props.urlList.map((_, index) => (
        <ArticleContentTemplate
          key={index}
          src="https://user-images.githubusercontent.com/18138131/36629884-12445790-19a0-11e8-8035-2f6c9e940f5c.png"
          width="640"
          height="480"
          alt=""
          header={"Img" + (props.urlList.length - index)}
          subject="Sample Image"
          body="https://github.com/Aofusa/gemspt-rs で作成したイメージ"
        ></ArticleContentTemplate>
      ))}
    </div>
  );
};

const HelloWorldInitializer: React.FunctionComponent<{}> = (_props) => {
  const [list, setList] = useState<Array<string>>(["/index.html"]);

  return (
    <div>
      <button
        onClick={(): void => {
          const a = list.slice();
          a.push("/index.html");
          setList(a);
        }}
      >
        Insert React Hello World!
      </button>
      <FetchContent urlList={list} />
    </div>
  );
};

const button = document.getElementById("hello");
button?.addEventListener("click", async () => {
  const root = document.getElementById("root");
  const element = <HelloWorldInitializer />;
  root?.removeChild(button);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return render(element, root!);
});
