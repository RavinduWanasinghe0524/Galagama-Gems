import { motion } from 'motion/react';

export function AboutUs() {
  return (
    <section id="about" className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"
        >
          About Galagama Gems
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to Galagama Gems, where the timeless allure of nature's treasures meets the pinnacle of human craftsmanship. Nestled in the heart of the world's most ancient gem-rich lands, we are a collective of master artisans, dedicated to transforming raw, exquisite gemstones into unparalleled works of art. Our journey began with a simple yet profound vision: to bridge the gap between discerning individuals and the radiant beauty of ethically sourced, handcrafted jewelry.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every piece from Galagama Gems tells a story – a narrative of meticulous design, sustainable practices, and a passion for perfection. We believe that jewelry is more than just adornment; it's an expression of individuality, a celebration of moments, and a legacy to be cherished across generations. With us, you don't just acquire a jewel; you embark on a personalized creative adventure, culminating in a masterpiece that resonates with your unique spirit.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex justify-center"
          >
            {/* Placeholder for an image or visual element */}
            <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-gray-500 text-xl">Image Placeholder</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
