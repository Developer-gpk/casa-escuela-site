import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";

import Layout from "../components/Layout";
import Section from "../components/Section";
import BottomLink from "../components/BottomLink";
import BackgroundColor from "../components/BackgroundColor";
import ImageSwicher from "../components/ImageSwicher";
import InviewElement from "../components/InviewElement";

import {
  findContentBySlug,
  findContentByType,
  getImages,
} from "../utils/utils";

export async function getServerSideProps() {
  const data = await sanityClient.fetch(
    `*[_type == "page" && slug.current == "residencies"][0]{
      slug,
      title,
      content,
    }`
  );

  return {
    props: {
      data,
    },
  };
}

const Residensies = ({ data: sectionsData }) => {
  const { title, content } = sectionsData;

  const intro = findContentBySlug("residencies", content);
  const exhibition = findContentBySlug("exhibition-space", content);
  const footer = findContentBySlug("footer", content);
  const link = findContentByType("link", content);

  console.log(content);

  return (
    <Layout pageTitle={title}>
      <BackgroundColor cSrcD="" cSrcM="" cColor="#dfe3da" cHeight="55%">
        <Section
          id={intro.slug.current}
          title={intro.title}
          intro={intro.intro}
          imagesSrc={getImages(intro.desktopImages)}
          mobileImagesSrc={getImages(intro.mobileImages)}
          footer={intro.footer}
          withMarginTop
        >
          <BottomLink
            path="https://www.instagram.com/casa.escuela/"
            text="Current artist in residence"
            target="_blank"
            paddingStyle={3}
          />
        </Section>
      </BackgroundColor>

      <Section id={exhibition.slug.current} title={exhibition.title}>
        <div className="exhibition-wrapper">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <InviewElement>
                <div className="exhibition-image">
                  <ImageSwicher
                    imagesSrc={getImages(exhibition.desktopImages)}
                  />
                </div>
              </InviewElement>
            </div>
            <div className="col-12 col-md-6">
              <div className="exhibition-body">
                <InviewElement>
                  <div className="section-body">
                    <BlockContent blocks={exhibition.body} />
                    <br />
                    <Link href="/files/exhibitions.pdf">
                      <a className="gplk-btn">Current exhibitions</a>
                    </Link>
                  </div>
                </InviewElement>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id={footer.slug.current}>
        <InviewElement>
          <div className="footer-image">
            <ImageSwicher
              imagesSrc={getImages(footer.desktopImages)}
              mobileImagesSrc={getImages(footer.mobileImages)}
            />
          </div>
        </InviewElement>
      </Section>

      <BottomLink path={link.href} text={link.text} />

      <style jsx>{`
        .exhibition-wrapper {
          margin-top: 80px;
        }

        .exhibition-image {
          margin-bottom: 80px;
          padding-bottom: 110.4%;
          position: relative;
        }

        .exhibition-body {
          margin: 0 auto;
          max-width: 430px;
        }

        .footer-image {
          margin-left: calc((var(--bs-gutter-x, 0.75rem) + 16px) * -1);
          margin-right: calc((var(--bs-gutter-x, 0.75rem) + 16px) * -1);
          padding-bottom: 78.321%;
          position: relative;
        }

        @media screen and (min-width: 768px) {
          .exhibition-wrapper {
            margin-top: 140px;
          }

          .exhibition-image {
            margin-bottom: 0;
          }

          .footer-image {
            margin-left: 0;
            margin-right: 0;
            padding-bottom: 48%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Residensies;
